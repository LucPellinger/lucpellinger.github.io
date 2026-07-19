import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FaCode } from 'react-icons/fa';
import Card from './Card';

describe('Card', () => {
	it('renders title and all features', () => {
		render(
			<Card
				icon={FaCode}
				title="Test Skills"
				features={['Feature one', 'Feature two', 'Feature three']}
			/>
		);
		expect(screen.getByText('Test Skills')).toBeInTheDocument();
		expect(screen.getByText('Feature one')).toBeInTheDocument();
		expect(screen.getByText('Feature two')).toBeInTheDocument();
		expect(screen.getByText('Feature three')).toBeInTheDocument();
	});
});
