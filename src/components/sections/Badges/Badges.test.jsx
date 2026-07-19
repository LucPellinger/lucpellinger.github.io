import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badges from './Badges';
import { badges } from '../../../utils/Data';

describe('Badges section', () => {
	it('renders the section title and every badge', () => {
		render(<Badges />);
		expect(screen.getByText('Certifications & Badges')).toBeInTheDocument();
		for (const badge of badges) {
			expect(screen.getByText(badge.title)).toBeInTheDocument();
		}
	});

	it('links badges with a url to their credential', () => {
		render(<Badges />);
		const links = screen.getAllByRole('link');
		for (const badge of badges) {
			if (badge.url) {
				expect(
					links.some((l) => l.getAttribute('href') === badge.url),
					`no link for "${badge.title}"`
				).toBe(true);
			}
		}
	});

	it('every badge has a title and issuer in the data', () => {
		for (const badge of badges) {
			expect(badge.title).toBeTruthy();
			expect(badge.issuer).toBeTruthy();
		}
	});
});
