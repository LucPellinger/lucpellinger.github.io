import Switch from 'react-switch';
import { FaSun, FaMoon, FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import type { CSSProperties } from 'react';

const iconStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	fontSize: 16,
};

interface ThemeToggleSwitchProps {
	isDarkTheme: boolean;
	toggleTheme: () => void;
}

function ThemeToggleSwitch({ isDarkTheme, toggleTheme }: ThemeToggleSwitchProps) {
	return (
		<Switch
			onChange={toggleTheme}
			checked={isDarkTheme}
			onColor='#4D4D4D'
			offColor='#ccc'
			height={24}
			width={48}
			handleDiameter={20}
			checkedIcon={
				<div style={iconStyle}>
					<FaCheck />
				</div>
			}
			uncheckedIcon={
				<div style={iconStyle}>
					<FaXmark />
				</div>
			}
			checkedHandleIcon={
				<div style={iconStyle}>
					<FaMoon aria-label='dark mode' />
				</div>
			}
			uncheckedHandleIcon={
				<div style={iconStyle}>
					<FaSun aria-label='light mode' />
				</div>
			}
			aria-label='theme switch'
		/>
	);
}

export default ThemeToggleSwitch;
