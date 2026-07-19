import { createContext, useEffect, useState, type ReactNode } from 'react';

export interface ThemeContextValue {
	isDarkTheme: boolean;
	toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components -- context and provider are intentionally co-located
export const ThemeContext = createContext<ThemeContextValue>({
	isDarkTheme: true,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme);
	};

	useEffect(() => {
		document.body.className = isDarkTheme ? 'dark-theme' : '';
	});

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
