import React, { useEffect, useRef, useState } from 'react';
import './GlobeJourney.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import globeData from '../../../utils/globeData.json';
import { journeyStops } from '../../../utils/Data';

/**
 * Interactive dotted globe showing the journey stops.
 *
 * - Canvas 2D orthographic projection (no three.js — keeps the bundle small).
 * - Land as evenly spaced dots; DE/CH/PT denser + accent colored; faint borders.
 * - City pins with a pulsing marker; great-circle path connecting the stops.
 * - Drag (mouse/touch) to rotate freely; auto-rotates gently when idle.
 * - Step chips / prev-next center each stop and show its chapter text.
 * - Auto-plays through the journey when first scrolled into view.
 *
 * Map data lives in src/utils/globeData.json — regenerate with
 * scripts/generate-globe-data.mjs to highlight more countries.
 */

const DEG = Math.PI / 180;
const AUTOPLAY_MS = 3200;

const GlobeJourney = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const wrapRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const [activeStep, setActiveStep] = useState(0);
	const activeStepRef = useRef(0);
	const interactedRef = useRef(false);

	// view = the lon/lat currently at the center of the globe
	const viewRef = useRef({ lon: 9, lat: 46 });
	const targetRef = useRef<{ lon: number; lat: number } | null>(null);

	const goToStep = (index: number, fromUser = true) => {
		const i = (index + journeyStops.length) % journeyStops.length;
		if (fromUser) interactedRef.current = true;
		activeStepRef.current = i;
		setActiveStep(i);
		const stop = journeyStops[i];
		targetRef.current = { lon: stop.lon, lat: Math.max(-60, Math.min(60, stop.lat)) };
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext && canvas.getContext('2d');
		if (!ctx) return; // jsdom / very old browsers

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let width = 0;
		let height = 0;
		let radius = 0;
		let rafId = 0;
		let dragging = false;
		let lastX = 0;
		let lastY = 0;
		let colors: Record<string, string> = {};

		const readColors = () => {
			const s = getComputedStyle(document.body);
			colors = {
				land: s.getPropertyValue('--globe-land').trim() || '#9E7BB5',
				accent: s.getPropertyValue('--special-text').trim() || '#000',
				active: s.getPropertyValue('--globe-active').trim() || '#8b4cb5',
				border: s.getPropertyValue('--circle-border').trim() || 'rgba(0,0,0,0.25)',
				bg: s.getPropertyValue('--nav-bg').trim() || '#9E7BB5',
			};
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const size = Math.min(wrap.clientWidth, 640);
			width = size;
			height = size;
			radius = size * 0.46;
			canvas.width = size * dpr;
			canvas.height = size * dpr;
			canvas.style.width = `${size}px`;
			canvas.style.height = `${size}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		/** Orthographic projection of lon/lat for the current view.
		    Returns {x, y, z} — visible when z > 0. */
		const project = (lon: number, lat: number) => {
			const view = viewRef.current;
			const λ = (lon - view.lon) * DEG;
			const φ = lat * DEG;
			const φ0 = view.lat * DEG;
			const cosφ = Math.cos(φ);
			const x = cosφ * Math.sin(λ);
			const y = Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * cosφ * Math.cos(λ);
			const z = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * cosφ * Math.cos(λ);
			return { x: width / 2 + x * radius, y: height / 2 - y * radius, z };
		};

		/** Great-circle interpolation between two stops (for the path). */
		const slerpPoints = (a: { lat: number; lon: number }, b: { lat: number; lon: number }, n: number) => {
			const toVec = (p: { lat: number; lon: number }) => {
				const φ = p.lat * DEG;
				const λ = p.lon * DEG;
				return [Math.cos(φ) * Math.cos(λ), Math.cos(φ) * Math.sin(λ), Math.sin(φ)];
			};
			const va = toVec(a);
			const vb = toVec(b);
			const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
			const ω = Math.acos(dot);
			const pts: { lon: number; lat: number }[] = [];
			for (let i = 0; i <= n; i++) {
				const t = i / n;
				const sA = ω === 0 ? 1 - t : Math.sin((1 - t) * ω) / Math.sin(ω);
				const sB = ω === 0 ? t : Math.sin(t * ω) / Math.sin(ω);
				const v = [
					sA * va[0] + sB * vb[0],
					sA * va[1] + sB * vb[1],
					sA * va[2] + sB * vb[2],
				];
				pts.push({
					lon: Math.atan2(v[1], v[0]) / DEG,
					lat: Math.asin(v[2] / Math.hypot(...v)) / DEG,
				});
			}
			return pts;
		};

		const pathSegments: { lon: number; lat: number }[][] = [];
		for (let i = 0; i < journeyStops.length - 1; i++) {
			pathSegments.push(slerpPoints(journeyStops[i], journeyStops[i + 1], 24));
		}

		const drawPolyline = <T extends { length: number }>(pts: T, getLonLat: (arr: T, i: number) => [number, number]) => {
			let started = false;
			ctx.beginPath();
			for (let i = 0; i < pts.length; i++) {
				const [lon, lat] = getLonLat(pts, i);
				const p = project(lon, lat);
				if (p.z > 0.02) {
					if (started) ctx.lineTo(p.x, p.y);
					else {
						ctx.moveTo(p.x, p.y);
						started = true;
					}
				} else {
					started = false;
				}
			}
			ctx.stroke();
		};

		const draw = (time: number) => {
			const view = viewRef.current;
			const target = targetRef.current;

			// animate toward the selected stop (shortest way around)
			if (target) {
				let dLon = target.lon - view.lon;
				dLon = ((dLon + 540) % 360) - 180;
				const dLat = target.lat - view.lat;
				view.lon += dLon * 0.07;
				view.lat += dLat * 0.07;
				if (Math.abs(dLon) < 0.05 && Math.abs(dLat) < 0.05) targetRef.current = null;
			} else if (!dragging && !reducedMotion) {
				view.lon += 0.018; // idle auto-rotation
			}

			ctx.clearRect(0, 0, width, height);
			const cx = width / 2;
			const cy = height / 2;

			// sphere disc
			const grad = ctx.createRadialGradient(
				cx - radius * 0.35, cy - radius * 0.4, radius * 0.1,
				cx, cy, radius * 1.05
			);
			grad.addColorStop(0, 'rgba(127, 127, 127, 0.14)');
			grad.addColorStop(1, 'rgba(127, 127, 127, 0.03)');
			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.arc(cx, cy, radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = colors.border;
			ctx.globalAlpha = 0.5;
			ctx.stroke();
			ctx.globalAlpha = 1;

			// country borders (faint)
			ctx.strokeStyle = colors.border;
			ctx.lineWidth = 0.6;
			ctx.globalAlpha = 0.55;
			for (const line of globeData.borders) {
				drawPolyline({ length: line.length / 2 }, (arr, i) => [line[i * 2], line[i * 2 + 1]]);
			}
			ctx.globalAlpha = 1;

			// land dots
			ctx.fillStyle = colors.land;
			const { land } = globeData;
			for (let i = 0; i < land.length; i += 2) {
				const p = project(land[i], land[i + 1]);
				if (p.z <= 0) continue;
				ctx.globalAlpha = 0.25 + 0.45 * p.z;
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.1 + 0.5 * p.z, 0, Math.PI * 2);
				ctx.fill();
			}

			// highlighted countries — denser, accent colored
			ctx.fillStyle = colors.accent;
			for (const dots of Object.values(globeData.highlights)) {
				for (let i = 0; i < dots.length; i += 2) {
					const p = project(dots[i], dots[i + 1]);
					if (p.z <= 0) continue;
					ctx.globalAlpha = 0.35 + 0.5 * p.z;
					ctx.beginPath();
					ctx.arc(p.x, p.y, 0.9 + 0.5 * p.z, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			ctx.globalAlpha = 1;

			// journey path
			ctx.strokeStyle = colors.accent;
			ctx.lineWidth = 1.2;
			ctx.globalAlpha = 0.5;
			for (const seg of pathSegments) {
				drawPolyline(seg, (arr, i) => [arr[i].lon, arr[i].lat]);
			}
			ctx.globalAlpha = 1;

			// city markers
			journeyStops.forEach((stop, i) => {
				const p = project(stop.lon, stop.lat);
				if (p.z <= 0) return;
				const isActive = i === activeStepRef.current;
				ctx.fillStyle = isActive ? colors.active : colors.accent;
				ctx.beginPath();
				ctx.arc(p.x, p.y, isActive ? 6 : 3.2, 0, Math.PI * 2);
				ctx.fill();
				ctx.strokeStyle = isActive ? colors.accent : colors.bg;
				ctx.lineWidth = 1.4;
				ctx.stroke();

				if (isActive && !reducedMotion) {
					const pulse = ((time % 1800) / 1800);
					ctx.strokeStyle = colors.active;
					ctx.lineWidth = 1.4;
					ctx.globalAlpha = 1 - pulse;
					ctx.beginPath();
					ctx.arc(p.x, p.y, 6 + pulse * 14, 0, Math.PI * 2);
					ctx.stroke();
					ctx.globalAlpha = 1;
				}
			});

			// tooltip card anchored to the active stop with a leader line
			const tip = tooltipRef.current;
			if (tip) {
				const active = journeyStops[activeStepRef.current];
				const p = project(active.lon, active.lat);
				if (p.z > 0.05) {
					const tw = tip.offsetWidth;
					const th = tip.offsetHeight;
					const gap = 75; // distance between the dot and the tooltip card
					const rightSide = p.x < width / 2;
					let cardX = rightSide ? p.x + gap : p.x - gap - tw;
					let cardY = p.y - th / 2;
					cardX = Math.min(Math.max(cardX, 2), width - tw - 2);
					cardY = Math.min(Math.max(cardY, 2), height - th - 2);
					tip.style.transform = `translate(${cardX}px, ${cardY}px)`;
					tip.style.opacity = '1';

					const anchorX = rightSide ? cardX : cardX + tw;
					const anchorY = Math.min(Math.max(p.y, cardY + 12), cardY + th - 12);
					ctx.strokeStyle = colors.active;
					ctx.lineWidth = 1.2;
					ctx.globalAlpha = 0.9;
					ctx.beginPath();
					ctx.moveTo(p.x + (rightSide ? 7 : -7), p.y);
					ctx.lineTo(anchorX, anchorY);
					ctx.stroke();
					ctx.globalAlpha = 1;
				} else {
					tip.style.opacity = '0';
				}
			}

			rafId = requestAnimationFrame(draw);
		};

		/* ---------- interaction ---------- */

		const onPointerDown = (e: PointerEvent) => {
			dragging = true;
			interactedRef.current = true;
			targetRef.current = null;
			lastX = e.clientX;
			lastY = e.clientY;
			canvas.setPointerCapture?.(e.pointerId);
		};
		const onPointerMove = (e: PointerEvent) => {
			if (!dragging) return;
			const degPerPx = 180 / width;
			viewRef.current.lon -= (e.clientX - lastX) * degPerPx;
			viewRef.current.lat = Math.max(
				-80,
				Math.min(80, viewRef.current.lat + (e.clientY - lastY) * degPerPx)
			);
			lastX = e.clientX;
			lastY = e.clientY;
		};
		const onPointerUp = () => {
			dragging = false;
		};

		canvas.addEventListener('pointerdown', onPointerDown);
		canvas.addEventListener('pointermove', onPointerMove);
		canvas.addEventListener('pointerup', onPointerUp);
		canvas.addEventListener('pointercancel', onPointerUp);

		/* ---------- autoplay on first visibility ---------- */

		let autoplayId = 0;
		const visObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !interactedRef.current && !reducedMotion) {
						let step = 0;
						goToStep(0, false);
						autoplayId = window.setInterval(() => {
							if (interactedRef.current || step >= journeyStops.length - 1) {
								window.clearInterval(autoplayId);
								return;
							}
							step += 1;
							goToStep(step, false);
						}, AUTOPLAY_MS);
						visObserver.disconnect();
					}
				});
			},
			{ threshold: 0.4 }
		);
		visObserver.observe(canvas);

		const themeObserver = new MutationObserver(readColors);
		themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

		window.addEventListener('resize', resize);
		readColors();
		resize();
		rafId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafId);
			window.clearInterval(autoplayId);
			visObserver.disconnect();
			themeObserver.disconnect();
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('pointerdown', onPointerDown);
			canvas.removeEventListener('pointermove', onPointerMove);
			canvas.removeEventListener('pointerup', onPointerUp);
			canvas.removeEventListener('pointercancel', onPointerUp);
		};
	}, []);

	const stop = journeyStops[activeStep];

	return (
		<div className='globe-journey' ref={wrapRef}>
			<div className='globe-journey__stage'>
				<div className='globe-journey__canvas-box'>
					<canvas
						ref={canvasRef}
						className='globe-journey__canvas'
						aria-label='Interactive globe showing the places Luc has lived. Drag to rotate.'
						role='img'
					/>
					<div className='globe-journey__tooltip' ref={tooltipRef}>
					<h3 className='globe-journey__tooltip-title'>
						{activeStep + 1}. {stop.place}
					</h3>
					<p className='globe-journey__tooltip-region'>
						{stop.region} ({stop.country})
					</p>
						<p className='globe-journey__tooltip-text'>{stop.chapter ?? stop.note ?? ''}</p>
					</div>
				</div>
			</div>

			<div className='globe-journey__controls'>
				<button
					type='button'
					className='globe-journey__arrow'
					aria-label='Previous stop'
					onClick={() => goToStep(activeStep - 1)}
				>
					<FaChevronLeft />
				</button>
				<div className='globe-journey__chips' aria-label='Journey stops'>
					{journeyStops.map((s, i) => (
						<button
							key={s.id}
							type='button'
							className='globe-journey__chip'
							aria-pressed={i === activeStep}
							onClick={() => goToStep(i)}
						>
							{s.place}
						</button>
					))}
				</div>
				<button
					type='button'
					className='globe-journey__arrow'
					aria-label='Next stop'
					onClick={() => goToStep(activeStep + 1)}
				>
					<FaChevronRight />
				</button>
			</div>

		</div>
	);
};

export default GlobeJourney;
