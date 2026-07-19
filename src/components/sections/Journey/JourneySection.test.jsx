import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import JourneySection from './JourneySection';
import { journeyStops } from '../../../utils/Data';

describe('Journey section', () => {
	it('renders the globe view by default with step chips for every stop', async () => {
		render(<JourneySection />);
		expect(await screen.findByRole('img', { name: /interactive globe/i })).toBeInTheDocument();
		for (const stop of journeyStops) {
			expect(screen.getByRole('button', { name: stop.place })).toBeInTheDocument();
		}
	});

	it('switches to the timeline view via the toggle', () => {
		render(<JourneySection />);
		fireEvent.click(screen.getByRole('button', { name: 'Timeline' }));
		expect(screen.getByRole('list', { name: /places i have lived/i })).toBeInTheDocument();
		expect(screen.queryByRole('img', { name: /interactive globe/i })).not.toBeInTheDocument();
	});

	it('shows the chapter text for the selected stop', async () => {
		render(<JourneySection />);
		fireEvent.click(await screen.findByRole('button', { name: 'Munich' }));
		expect(screen.getByText(/4\.\s*Munich/)).toBeInTheDocument();
	});

	it('every journey stop has globe coordinates', () => {
		for (const stop of journeyStops) {
			expect(typeof stop.lat, `${stop.place} lat`).toBe('number');
			expect(typeof stop.lon, `${stop.place} lon`).toBe('number');
		}
	});
});
