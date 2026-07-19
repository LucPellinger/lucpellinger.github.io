import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Portfolio filters', () => {
	it('filters projects by role type tab', () => {
		render(<Portfolio />);
		fireEvent.click(screen.getByRole('button', { name: 'Data Engineering' }));

		for (const item of portfolioItems) {
			if ((item.roleTypes ?? []).includes('Data Engineering')) {
				expect(screen.getByText(item.title)).toBeInTheDocument();
			} else {
				expect(screen.queryByText(item.title)).not.toBeInTheDocument();
			}
		}
	});

	it('filters projects by stack chip', () => {
		render(<Portfolio />);
		fireEvent.click(screen.getByRole('button', { name: 'React' }));

		for (const item of portfolioItems) {
			if ((item.stack ?? []).includes('React')) {
				expect(screen.getByText(item.title)).toBeInTheDocument();
			} else {
				expect(screen.queryByText(item.title)).not.toBeInTheDocument();
			}
		}
	});

	it('shows all projects again after selecting the All tab', () => {
		render(<Portfolio />);
		fireEvent.click(screen.getByRole('button', { name: 'Data Engineering' }));
		fireEvent.click(screen.getByRole('button', { name: 'All' }));

		for (const item of portfolioItems) {
			expect(screen.getByText(item.title)).toBeInTheDocument();
		}
	});

	it('shows an empty state with a working clear button for impossible combinations', () => {
		render(<Portfolio />);
		fireEvent.click(screen.getByRole('button', { name: 'Data Engineering' }));
		fireEvent.click(screen.getByRole('button', { name: 'React' }));

		expect(screen.getByText(/no projects match/i)).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));
		for (const item of portfolioItems) {
			expect(screen.getByText(item.title)).toBeInTheDocument();
		}
	});
});
