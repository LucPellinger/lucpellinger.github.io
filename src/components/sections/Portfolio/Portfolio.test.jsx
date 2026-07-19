import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Portfolio from './Portfolio';
import { portfolioItems } from '../../../utils/Data';

describe('Portfolio section', () => {
	it('renders a card with image for every portfolio item', () => {
		render(<Portfolio />);
		for (const item of portfolioItems) {
			expect(screen.getByText(item.title)).toBeInTheDocument();
			expect(screen.getByAltText(item.alt)).toBeInTheDocument();
		}
	});

	it('links every card to its project URL', () => {
		render(<Portfolio />);
		const links = screen.getAllByRole('link');
		for (const item of portfolioItems) {
			expect(
				links.some((l) => l.getAttribute('href') === item.url),
				`no link found for "${item.title}"`
			).toBe(true);
		}
	});
});
