// components/sections/Hero.jsx
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import hfLogo from '../../../assets/Hero/hf-logo.svg';
import HeroImg from '../../../assets/Hero/dev_2.webp';
import './Hero.css';

const Hero = ({ onResumeClick }: { onResumeClick: () => void }) => (
	<section className='hero-section' id='hero'>
		<div className='hero-section__left'>
			<h1 className='hero-section__special-text'>
				Hello! I am <br /> Luc
			</h1>
			<div className='hero-section__paragraph'>
				<p>
					Data Scientist and ML Engineer professionally specialized in time
					series prediction, and passionate about computer vision technology.
				</p>
			</div>

			<button type='button' onClick={onResumeClick} className='button'>
				View Resume
			</button>
		</div>

		<div className='hero-section__right'>
			<div className='hero-section__figure'>
				<img
					src={HeroImg}
					alt='Portrait of Luc Pellinger'
					width='1200'
					height='1767'
				/>
				{/* The nav box is an invisible ellipse; its border draws the arc and
				    the links sit on the ellipse boundary at fixed angles. */}
				<nav className='social-links' aria-label='Social profiles'>
				<a
					href='https://www.linkedin.com/in/luc-pellinger/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='LinkedIn'
				>
					<FaLinkedin />
				</a>
				<a
					href='https://github.com/LucPellinger'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='GitHub'
				>
					<FaGithub />
				</a>
				<a
					href='https://huggingface.co/LucMarcelPellinger'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Hugging Face'
				>
					<img src={hfLogo} alt='' />
				</a>
				</nav>
			</div>
		</div>
	</section>
);

export default Hero;
