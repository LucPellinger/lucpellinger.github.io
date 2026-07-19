import { describe, it, expect } from 'vitest';
import { cards, languages, slidesData, portfolioItems, academicData } from './Data';

// Content integrity checks: catch broken/incomplete entries before they deploy.

describe('portfolioItems', () => {
	it('has entries', () => {
		expect(portfolioItems.length).toBeGreaterThan(0);
	});

	it('every entry has the required fields', () => {
		for (const item of portfolioItems) {
			expect(item.id, `id missing on "${item.title}"`).toBeDefined();
			expect(item.src, `image missing on "${item.title}"`).toBeTruthy();
			expect(item.alt, `alt text missing on "${item.title}"`).toBeTruthy();
			expect(item.title).toBeTruthy();
			expect(Array.isArray(item.categories)).toBe(true);
			expect(item.categories.length).toBeGreaterThan(0);
		}
	});

	it('ids are unique', () => {
		const ids = portfolioItems.map((i) => i.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('urls are well-formed when present', () => {
		for (const item of portfolioItems) {
			if (item.url) {
				expect(() => new URL(item.url), `bad url on "${item.title}": ${item.url}`).not.toThrow();
			}
		}
	});
});

describe('slidesData (experience)', () => {
	it('every slide has image, title and company', () => {
		expect(slidesData.length).toBeGreaterThan(0);
		for (const slide of slidesData) {
			expect(slide.imgSrc, `image missing on "${slide.title}"`).toBeTruthy();
			expect(slide.title).toBeTruthy();
			expect(slide.company).toBeTruthy();
		}
	});
});

describe('academicData', () => {
	it('every entry has required fields and valid dates', () => {
		expect(academicData.length).toBeGreaterThan(0);
		for (const entry of academicData) {
			expect(entry.title).toBeTruthy();
			expect(entry.subtitle).toBeTruthy();
			expect(entry.image, `image missing on "${entry.title}"`).toBeTruthy();
			if (entry.date_from) {
				expect(Number.isNaN(Date.parse(entry.date_from)), `bad date_from on "${entry.title}"`).toBe(false);
			}
			if (entry.date_to) {
				expect(Number.isNaN(Date.parse(entry.date_to)), `bad date_to on "${entry.title}"`).toBe(false);
			}
		}
	});
});

describe('skills cards and languages', () => {
	it('cards have icon, title and features', () => {
		for (const card of cards) {
			expect(card.icon, `icon missing on "${card.title}"`).toBeTruthy();
			expect(card.title).toBeTruthy();
			expect(card.features.length).toBeGreaterThan(0);
		}
	});

	it('language percentages are between 0 and 100', () => {
		for (const lang of languages) {
			expect(lang.label).toBeTruthy();
			expect(lang.percent).toBeGreaterThanOrEqual(0);
			expect(lang.percent).toBeLessThanOrEqual(100);
		}
	});
});
