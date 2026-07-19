import './MyHeader.css';
import { useTheme } from '../../context/useTheme';
import ThemeToggleSwitch from '../switch/switch';
import { useEffect, useState } from 'react';
import Logo from '../../assets/Header/Logo_new.png';

const NAV_LINKS = [
	{ label: 'Home', href: '#home' },
	{ label: 'Portfolio', href: '#portfolio' },
	{ label: 'Journey', href: '#journey' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Education', href: '#education' },
	{ label: 'Skills', href: '#skills' },
];

const MyHeader = () => {
	const { isDarkTheme, toggleTheme } = useTheme();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	// close the mobile menu with Escape
	useEffect(() => {
		if (!isMobileMenuOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsMobileMenuOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isMobileMenuOpen]);

	return (
		<header className={`nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
			<div className='nav__wrapper container'>
				<div className='nav__logo' onClick={() => { window.location.href = '/'; }}>
					<img src={Logo} alt='Logo' className='nav__logo-image' />
					<span className='nav__logo-text'>Luc Marcel Pellinger</span>
				</div>

				<ul
					id='primary-navigation'
					className={`nav__menu ${isMobileMenuOpen ? 'mobile-menu' : ''}`}
				>
					{NAV_LINKS.map(({ label, href }) => (
						<li className='nav__menu-items' key={href}>
							<a href={href} onClick={closeMobileMenu}>
								{label}
							</a>
						</li>
					))}
					<li className='buttons'>
						<label className='switch'>
							<ThemeToggleSwitch isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
						</label>
					</li>
				</ul>

				<button
					type='button'
					className='hamburger-menu'
					aria-expanded={isMobileMenuOpen}
					aria-controls='primary-navigation'
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					onClick={toggleMobileMenu}
				>
					<span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
					<span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
					<span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
				</button>
			</div>
		</header>
	);
};

export default MyHeader;
