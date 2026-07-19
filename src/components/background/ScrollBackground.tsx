import React, { useEffect, useRef } from 'react';
import './ScrollBackground.css';

/**
 * Scroll-driven 3D particle background.
 *
 * A fixed canvas behind the page renders a cloud of dots that morph between
 * 3D shapes as the visitor scrolls, each forming centered in its own empty
 * "interlude" band:
 *
 *   hero        → scattered floating dots
 *   interlude 1 → puzzle cube (2x2x2 sub-cubes, one corner missing), spinning
 *   interlude 2 → location pin (sphere + cone), spinning
 *   interlude 3 → X (extruded, gently swaying)
 *   interlude 4 → "LP" monogram (extruded, gently swaying)
 *
 * Dots get perspective: nearer dots are bigger and more opaque.
 * Respects prefers-reduced-motion (static faint dots, no animation).
 */

const SAMPLE_SIZE = 260;

interface Point3 {
	x: number;
	y: number;
	z: number;
}

interface ShapeFrame {
	at: number;
	pts: Point3[];
	full?: boolean;
	scale?: number;
	spin?: number;
	tilt?: number;
	sway?: number;
	swaySpeed?: number;
}
const PERSPECTIVE = 2.2;

/* ---------- deterministic randomness ---------- */

const makeRand = (seed: number) => (): number =>
	((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const shuffle = <T,>(arr: T[], rand: () => number): T[] => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

/* ---------- 3D shape generators (points normalized ~ −0.5…0.5) ---------- */

/** Cube built from 2x2x2 sub-cubes with the top-front-right one missing. */
const cube3D = (count: number): Point3[] => {
	const rand = makeRand(11);
	const segs: number[][][] = [];
	for (let ci = 0; ci < 2; ci++) {
		for (let cj = 0; cj < 2; cj++) {
			for (let ck = 0; ck < 2; ck++) {
				if (ci === 1 && cj === 0 && ck === 1) continue; // the missing corner piece
				const c = (a: number, b: number, d: number) => [
					-0.5 + (ci + a) * 0.5,
					-0.5 + (cj + b) * 0.5,
					-0.5 + (ck + d) * 0.5,
				];
				segs.push(
					[c(0, 0, 0), c(1, 0, 0)], [c(0, 1, 0), c(1, 1, 0)],
					[c(0, 0, 1), c(1, 0, 1)], [c(0, 1, 1), c(1, 1, 1)],
					[c(0, 0, 0), c(0, 1, 0)], [c(1, 0, 0), c(1, 1, 0)],
					[c(0, 0, 1), c(0, 1, 1)], [c(1, 0, 1), c(1, 1, 1)],
					[c(0, 0, 0), c(0, 0, 1)], [c(1, 0, 0), c(1, 0, 1)],
					[c(0, 1, 0), c(0, 1, 1)], [c(1, 1, 0), c(1, 1, 1)]
				);
			}
		}
	}
	const out: Point3[] = [];
	for (let i = 0; i < count; i++) {
		const [p, q] = segs[Math.floor(rand() * segs.length)];
		const t = rand();
		out.push({
			x: p[0] + (q[0] - p[0]) * t,
			y: p[1] + (q[1] - p[1]) * t,
			z: p[2] + (q[2] - p[2]) * t,
		});
	}
	return out;
};

/** Location pin: sphere head + cone tip pointing down (canvas y grows down). */
const pin3D = (count: number): Point3[] => {
	const rand = makeRand(23);
	const out = [];
	const headY = -0.14;
	const R = 0.28;
	const nHead = Math.floor(count * 0.62);
	const golden = Math.PI * (1 + Math.sqrt(5));
	for (let i = 0; i < nHead; i++) {
		const k = i + 0.5;
		const phi = Math.acos(1 - (2 * k) / nHead);
		const theta = golden * k;
		out.push({
			x: R * Math.sin(phi) * Math.cos(theta),
			y: headY + R * Math.cos(phi),
			z: R * Math.sin(phi) * Math.sin(theta),
		});
	}
	const coneTop = headY + R * 0.55;
	const tipY = 0.46;
	for (let i = nHead; i < count; i++) {
		const t = rand();
		const r = R * 0.72 * (1 - t);
		const ang = rand() * Math.PI * 2;
		out.push({
			x: r * Math.cos(ang),
			y: coneTop + (tipY - coneTop) * t,
			z: r * Math.sin(ang),
		});
	}
	return out;
};

/** Random cloud filling the viewport (z used for subtle parallax/size). */
const scatter3D = (count: number): Point3[] => {
	const rand = makeRand(7);
	const out = [];
	for (let i = 0; i < count; i++) {
		out.push({ x: rand() - 0.5, y: rand() - 0.5, z: rand() - 0.5 });
	}
	return out;
};

/* ---------- 2D text sampling, extruded into a 3D slab ---------- */

const sampleText = (text: string, fontScale: number, count: number, depth: number): Point3[] => {
	const off = document.createElement('canvas');
	off.width = SAMPLE_SIZE;
	off.height = SAMPLE_SIZE;
	const ctx = off.getContext('2d', { willReadFrequently: true })!;
	ctx.fillStyle = '#000';
	ctx.font = `${SAMPLE_SIZE * fontScale}px "Special Elite", "Courier New", monospace`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, SAMPLE_SIZE / 2, SAMPLE_SIZE * 0.54);

	const data = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
	const pts: { x: number; y: number }[] = [];
	for (let y = 0; y < SAMPLE_SIZE; y += 2) {
		for (let x = 0; x < SAMPLE_SIZE; x += 2) {
			if (data[(y * SAMPLE_SIZE + x) * 4 + 3] > 100) {
				pts.push({ x: x / SAMPLE_SIZE - 0.5, y: y / SAMPLE_SIZE - 0.5 });
			}
		}
	}
	if (pts.length === 0) return scatter3D(count);
	const rand = makeRand(42);
	shuffle(pts, rand);
	const out = [];
	for (let i = 0; i < count; i++) {
		const p = pts[Math.floor((i * pts.length) / count)];
		out.push({ x: p.x, y: p.y, z: (rand() - 0.5) * depth });
	}
	return out;
};

/* ---------- component ---------- */

const ScrollBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const count = window.innerWidth < 768 ? 320 : 480;

		let width = 0;
		let height = 0;
		let color = '#9E7BB5';
		let frames: ShapeFrame[] = [];
		let rafId = 0;
		let smoothScroll = window.scrollY;

		const shapes = {
			scatter: scatter3D(count),
			cube: cube3D(count),
			pin: pin3D(count),
			x: sampleText('X', 0.9, count, 0.16),
			lp: sampleText('LP', 0.5, count, 0.14),
		};

		const rand = makeRand(99);
		const particles = Array.from({ length: count }, () => ({
			x: rand() * window.innerWidth,
			y: rand() * window.innerHeight,
			phase: rand() * Math.PI * 2,
			speed: 0.4 + rand() * 0.8,
		}));

		const readColor = () => {
			const c = getComputedStyle(document.body)
				.getPropertyValue('--nav_button-bg')
				.trim();
			if (c) color = c;
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		/** Anchor each shape to its interlude band (empty stage between sections),
		    falling back to the related section if the interlude is missing. */
		const computeFrames = () => {
			const vh = window.innerHeight;
			const centerOf = (...sels: string[]) => {
				for (const sel of sels) {
					const el = document.querySelector(sel);
					if (el) {
						const r = el.getBoundingClientRect();
						return r.top + window.scrollY + r.height / 2;
					}
				}
				return null;
			};
			const scale = Math.min(width, vh) * 0.66;

			const candidates: Array<Omit<ShapeFrame, 'at'> & { at: number | null }> = [
				{ at: vh * 0.5, pts: shapes.scatter, full: true },
				{
					at: centerOf('#interlude-cube', '#portfolio'),
					pts: shapes.cube,
					scale: scale * 0.8,
					spin: 0.00045,
					tilt: 0.5,
				},
				{
					at: centerOf('#interlude-pin', '#journey'),
					pts: shapes.pin,
					scale,
					spin: 0.0006,
					tilt: 0.06,
				},
				{
					at: centerOf('#interlude-x', '#skills'),
					pts: shapes.x,
					scale: scale * 0.9,
					sway: 0.55,
					swaySpeed: 0.0005,
					tilt: 0.05,
				},
				{
					at:
						centerOf('#interlude-lp') ??
						document.documentElement.scrollHeight - vh * 0.55,
					pts: shapes.lp,
					scale,
					sway: 0.4,
					swaySpeed: 0.0004,
					tilt: 0.04,
				},
			];
			frames = candidates
				.filter((f): f is ShapeFrame => f.at !== null)
				.sort((a, b) => a.at - b.at);
		};

		/** Rotate + perspective-project a shape point to screen space.
		    Returns {x, y, f} where f is the depth factor (size/alpha). */
		const targetFor = (frame: ShapeFrame, i: number, time: number) => {
			const p = frame.pts[i];
			if (frame.full) {
				return {
					x: (p.x + 0.5) * width,
					y: (p.y + 0.5) * height,
					f: 1 + p.z * 0.6,
				};
			}
			const angle = frame.spin
				? time * frame.spin
				: frame.sway
					? frame.sway * Math.sin(time * (frame.swaySpeed ?? 0))
					: 0;
			const cosA = Math.cos(angle);
			const sinA = Math.sin(angle);
			const x1 = p.x * cosA + p.z * sinA;
			const z1 = -p.x * sinA + p.z * cosA;
			const tilt = frame.tilt || 0;
			const cosB = Math.cos(tilt);
			const sinB = Math.sin(tilt);
			const y1 = p.y * cosB - z1 * sinB;
			const z2 = p.y * sinB + z1 * cosB;
			const f = PERSPECTIVE / (PERSPECTIVE + z2);
			return {
				x: x1 * (frame.scale ?? 1) * f + width * 0.5,
				y: y1 * (frame.scale ?? 1) * f + height * 0.5,
				f,
			};
		};

		const smoothstep = (t: number) => t * t * (3 - 2 * t);

		const draw = (time: number) => {
			const target = window.scrollY + height / 2;
			smoothScroll += (target - smoothScroll) * 0.08;

			let a = frames[0];
			let b = frames[0];
			for (let i = 0; i < frames.length; i++) {
				if (frames[i].at <= smoothScroll) {
					a = frames[i];
					b = frames[Math.min(i + 1, frames.length - 1)];
				}
			}
			let t = a === b ? 0 : (smoothScroll - a.at) / (b.at - a.at);
			t = Math.min(Math.max(t, 0), 1);
			// hold the formed shape near each anchor, morph in between
			t = smoothstep(Math.min(Math.max((t - 0.18) / 0.64, 0), 1));

			const isScatter = a.full && t < 0.5;
			const wobble = isScatter ? 16 : 4;

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = color;

			for (let i = 0; i < count; i++) {
				const pt = particles[i];
				const ta = targetFor(a, i, time);
				const tb = targetFor(b, i, time);
				const tx =
					ta.x + (tb.x - ta.x) * t +
					Math.sin(time * 0.001 * pt.speed + pt.phase) * wobble;
				const ty =
					ta.y + (tb.y - ta.y) * t +
					Math.cos(time * 0.0012 * pt.speed + pt.phase) * wobble;
				const f = ta.f + (tb.f - ta.f) * t;
				pt.x += (tx - pt.x) * 0.08;
				pt.y += (ty - pt.y) * 0.08;
				ctx.globalAlpha = Math.min(Math.max(0.55 * f, 0.15), 0.9);
				ctx.beginPath();
				ctx.arc(pt.x, pt.y, 2.2 * f, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;

			rafId = requestAnimationFrame(draw);
		};

		const drawStatic = () => {
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = color;
			ctx.globalAlpha = 0.3;
			shapes.scatter.forEach((p) => {
				ctx.beginPath();
				ctx.arc((p.x + 0.5) * width, (p.y + 0.5) * height, 2.2, 0, Math.PI * 2);
				ctx.fill();
			});
			ctx.globalAlpha = 1;
		};

		const rebuild = () => {
			resize();
			computeFrames();
			if (reducedMotion) drawStatic();
		};

		readColor();
		rebuild();

		// re-sample text shapes once the display font is loaded
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				shapes.x = sampleText('X', 0.9, count, 0.16);
				shapes.lp = sampleText('LP', 0.5, count, 0.14);
				computeFrames();
				if (reducedMotion) drawStatic();
			});
		}

		const themeObserver = new MutationObserver(() => {
			readColor();
			if (reducedMotion) drawStatic();
		});
		themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

		// layout shifts (image loads etc.) move the section anchors
		const layoutObserver = new ResizeObserver(() => computeFrames());
		layoutObserver.observe(document.body);

		window.addEventListener('resize', rebuild);
		if (!reducedMotion) rafId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafId);
			themeObserver.disconnect();
			layoutObserver.disconnect();
			window.removeEventListener('resize', rebuild);
		};
	}, []);

	return <canvas ref={canvasRef} className='scroll-background' aria-hidden='true' />;
};

export default ScrollBackground;
