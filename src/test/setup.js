import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Unmount rendered components after each test
afterEach(() => {
	cleanup();
});

// jsdom doesn't implement IntersectionObserver (used by Home.jsx)
globalThis.IntersectionObserver = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// jsdom doesn't implement matchMedia (used by some UI libraries)
globalThis.matchMedia =
	globalThis.matchMedia ||
	vi.fn(() => ({
		matches: false,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
	}));
