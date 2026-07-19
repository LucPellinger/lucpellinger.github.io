import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './useTheme';

const Probe = () => {
	const { isDarkTheme, toggleTheme } = useTheme();
	return (
		<button onClick={toggleTheme}>{isDarkTheme ? 'dark' : 'light'}</button>
	);
};

describe('ThemeContext', () => {
	it('defaults to dark theme and applies the body class', () => {
		render(
			<ThemeProvider>
				<Probe />
			</ThemeProvider>
		);
		expect(screen.getByRole('button')).toHaveTextContent('dark');
		expect(document.body.className).toBe('dark-theme');
	});

	it('toggleTheme switches to light and updates the body class', () => {
		render(
			<ThemeProvider>
				<Probe />
			</ThemeProvider>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(screen.getByRole('button')).toHaveTextContent('light');
		expect(document.body.className).toBe('');
	});
});
