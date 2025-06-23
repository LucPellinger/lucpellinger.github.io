import Switch from 'react-switch';
import './MyHeader.css';
import { useTheme } from '../../context/useTheme';
import { useState } from 'react';
import MyModal from '../modal/MyModal';
import Logo from '../../assets/header/Logo_new.png';

const MyHeader = ( { onResumeClick }) => {
	const { isDarkTheme, toggleTheme } = useTheme();
	const [isMobileMenuOpen, setISMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setISMobileMenuOpen(!isMobileMenuOpen);
	};
	return (
		<div className={`nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
			{/* BLOCK ELEMENT MODIFIER */}
			<div className='nav__wrapper container'>
				<div className='nav__logo' onClick={() => { window.location.href = '/'; }}>
					<img src={Logo} alt='Logo' className='nav__logo-image' />
  					<span className='nav__logo-text'>Luc Marcel Pellinger</span>
				</div>
				<ul className={`nav__menu ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
					<li className='nav__menu-items'>
						<a href='#home'>Home</a>
					</li>
					<li className='nav__menu-items'>
						<a href='#portfolio'>Portfolio</a>
					</li>
					<li className='nav__menu-items'>
						<a href='#experience'>Experience</a>
					</li>
					<li className='nav__menu-items'>
						<a href='#education'>Education</a>
					</li>
					<li className='nav__menu-items'>
						<a href='#skills'>Skills</a>
					</li>
					{/*<li className='nav__menu-items'>
						<a href='#contact'>Contact</a>
					</li>*/}
					<li className='buttons'>
						<label htmlFor='' className='switch'>
							<Switch
								height={24}
								width={48}
								onColor='#4D4D4D'
								offColor='#ccc'
								onChange={toggleTheme}
								checked={isDarkTheme}
							/>
						</label>
						{/*<a onClick={ onResumeClick } className='nav_button'>
							View Resume
						</a>*/}
					</li>
				</ul>
			</div>
			<div className='hamburger-menu' onClick={toggleMobileMenu}>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
			</div>
		</div>
	);
};

export default MyHeader;