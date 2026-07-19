#!/usr/bin/env node
/**
 * Generates src/utils/globeData.json for the GlobeJourney component.
 *
 * Bakes Natural Earth data (via the `world-atlas` npm package) into a compact
 * JSON file: evenly-spaced land dots, denser dots for highlighted countries,
 * and country border polylines. No runtime dependency — this runs offline.
 *
 * Usage:
 *   npm i --no-save world-atlas@2 topojson-client   (or yarn add -D)
 *   node scripts/generate-globe-data.mjs
 *
 * To highlight more countries (e.g. after moving somewhere new), add their
 * ISO-3166 numeric id below and re-run. Ids: https://en.wikipedia.org/wiki/ISO_3166-1_numeric
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** Countries to render with denser, accent-colored dots. */
const HIGHLIGHT = {
	276: 'DEU', // Germany
	756: 'CHE', // Switzerland
	620: 'PRT', // Portugal
};

const DOT_STEP = 1.3; // degrees between land dots (at the equator)
const HIGHLIGHT_STEP = 0.25; // denser grid for highlighted countries
const MIN_LAT = -56; // skip Antarctica

const resolveAtlas = (file) => {
	try {
		return require.resolve(`world-atlas/${file}`);
	} catch {
		console.error(`Cannot find world-atlas/${file}. Run: npm i --no-save world-atlas@2 topojson-client`);
		process.exit(1);
	}
};

const topojson = await import('topojson-client').catch(() => {
	console.error('Cannot find topojson-client. Run: npm i --no-save world-atlas@2 topojson-client');
	process.exit(1);
});

const topo50 = JSON.parse(readFileSync(resolveAtlas('countries-50m.json')));
const topo110 = JSON.parse(readFileSync(resolveAtlas('countries-110m.json')));

const fc = topojson.feature(topo50, topo50.objects.countries);

/* ---------- point-in-polygon ---------- */

const inRing = (pt, ring) => {
	let inside = false;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		const [xi, yi] = ring[i];
		const [xj, yj] = ring[j];
		if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) {
			inside = !inside;
		}
	}
	return inside;
};

const inPoly = (pt, poly) => {
	if (!inRing(pt, poly[0])) return false;
	for (let k = 1; k < poly.length; k++) if (inRing(pt, poly[k])) return false;
	return true;
};

const inFeature = (pt, geom) =>
	geom.type === 'Polygon'
		? inPoly(pt, geom.coordinates)
		: geom.coordinates.some((p) => inPoly(pt, p));

// precompute bounding boxes
for (const f of fc.features) {
	let minX = 180, minY = 90, maxX = -180, maxY = -90;
	const scan = (ring) =>
		ring.forEach(([x, y]) => {
			minX = Math.min(minX, x); maxX = Math.max(maxX, x);
			minY = Math.min(minY, y); maxY = Math.max(maxY, y);
		});
	const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
	polys.forEach((p) => p.forEach(scan));
	f.bbox2 = [minX, minY, maxX, maxY];
}

const countryAt = (pt) => {
	for (const f of fc.features) {
		const [minX, minY, maxX, maxY] = f.bbox2;
		if (pt[0] < minX || pt[0] > maxX || pt[1] < minY || pt[1] > maxY) continue;
		if (inFeature(pt, f.geometry)) return f;
	}
	return null;
};

/* ---------- land dots (even spacing on the sphere) ---------- */

const land = [];
for (let lat = MIN_LAT; lat <= 84; lat += DOT_STEP) {
	const lonStep = DOT_STEP / Math.max(0.25, Math.cos((lat * Math.PI) / 180));
	for (let lon = -180; lon < 180; lon += lonStep) {
		const f = countryAt([lon, lat]);
		if (f && !HIGHLIGHT[Number(f.id)]) {
			land.push(+lon.toFixed(2), +lat.toFixed(2));
		}
	}
}

/* ---------- highlighted countries (denser) ---------- */

const highlights = {};
for (const [id, code] of Object.entries(HIGHLIGHT)) {
	const f = fc.features.find((x) => Number(x.id) === Number(id));
	if (!f) {
		console.warn(`Country id ${id} (${code}) not found — skipping`);
		continue;
	}
	const [minX, minY, maxX, maxY] = f.bbox2;
	const arr = [];
	for (let lat = minY; lat <= maxY; lat += HIGHLIGHT_STEP) {
		const lonStep = HIGHLIGHT_STEP / Math.max(0.25, Math.cos((lat * Math.PI) / 180));
		for (let lon = minX; lon <= maxX; lon += lonStep) {
			if (inFeature([lon, lat], f.geometry)) {
				arr.push(+lon.toFixed(2), +lat.toFixed(2));
			}
		}
	}
	highlights[code] = arr;
}

/* ---------- borders (coarse 110m mesh keeps the file small) ---------- */

const mesh = topojson.mesh(topo110, topo110.objects.countries);
const borders = [];
for (const line of mesh.coordinates) {
	if (line.every(([, la]) => la < -60)) continue; // skip Antarctica
	const flat = [];
	line.forEach(([lo, la]) => flat.push(+lo.toFixed(1), +la.toFixed(1)));
	borders.push(flat);
}

/* ---------- write ---------- */

const out = new URL('../src/utils/globeData.json', import.meta.url);
writeFileSync(out, JSON.stringify({ land, highlights, borders }));
console.log(
	`globeData.json written: ${land.length / 2} land dots, ` +
	Object.entries(highlights).map(([c, a]) => `${c}: ${a.length / 2}`).join(', ') +
	`, ${borders.length} border lines`
);
