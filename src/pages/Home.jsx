
import React from 'react';
import './Home.css';
import { v4 as uuid } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { cards, languages } from '../utils/Data';
import { FaChevronDown } from 'react-icons/fa';
import Slider from "../components/slider/Slider";
import Hero from '../components/sections/Hero/Hero';
import Portfolio from '../components/sections/Portfolio/Portfolio';
import AcademicTiles from '../components/sections/Academic/AcademicTiles';
import Contact from '../components/contact/Contact';
import Card from '../components/card/Card';


const Home = ( { onResumeClick, onExperienceClick } ) => {
	const skillRef = useRef(null);
	const swiperRef = useRef(null);
	const [showModal, setShowModal] = useState(false);


	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animateProgressbar();
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(skillRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		register();

		if (swiperRef.current) {
			const params = {
				breakpoints: {
					280: {
						slidesPerView: 1,
					},
					600: {
						slidesPerView: 2,
					},
					991: {
						slidesPerView: 3,
					},
				},
			};

			Object.assign(swiperRef.current, params);
			swiperRef.current.initialize();
		}
	}, []);

	const animateProgressbar = () => {
		const progressBars = document.querySelectorAll('.skill__progress-line');

		progressBars.forEach((progressBar) => {
			const percent = progressBar.getAttribute('data-width');
			progressBar.style.width = `${percent}%`;
		});
	};
	return (
		<div className='container home'>
			<Hero onResumeClick={onResumeClick} />

			<div className='hero-section__scroll-down'>
			  <div className='tooltip'>
			    <a href='#portfolio' className='scroll-down-link'>
			      <FaChevronDown />
			    </a>
			    <span className='tooltip-text'>Scroll to Portfolio</span>
			  </div>
			</div>

			<Portfolio />
			
			<section className='experience' id='experience'>
				<h3 className='section__label'>Experience</h3>
				<h2 className=' section__title'>Professional Experience</h2>
				<div className='experience__wrapper'>
					<Slider/>
				</div>			
			</section>

			<section className='education' id='education'>
				<h3 className='section__label'>Education</h3>
				<h2 className='section__title'>Academic Background</h2>
				<div className='education__wrapper'>
					<AcademicTiles/>
				</div>			
			</section>
			
			<section className='services' id='skills'>
				<h3 className='section__label'>Skills</h3>
				<h2 className='section__title'>My Technology Skills</h2>
				<div className='cards'>
					{cards?.map((card) => (
						<Card
							key={uuid()}
							icon={card?.icon}
							title={card?.title}
							features={card?.features}
						/>
					))}
				</div>
			</section>



		    <section className='skill' id='languageskills' ref={skillRef}>
		      <div className='skill__left'>
		        <h2 className='section__title'>My Language Skills</h2>
		        <a href='/resume.pdf' download='resume.pdf' className='button'>
		          Get Resume
		        </a>
		      </div>
		      <div className='skill__right'>
		        {languages.map(({ label, percent }) => (
		          <div className='skill__wrapper' key={label}>
		            <div className='skill__tag'>{label}</div>
		            <div className='skill__box'>
		              <div className='skill__progress-line' data-width={percent}></div>
		              <div className='skill__percentage'>{percent}%</div>
		            </div>
		          </div>
		        ))}
		      </div>
		    </section>

			{/*<div className='contact' id='contact'>
				<h3 className='section__label'>Contact</h3>
				<h2 className=' section__title'>Connect with me</h2>

				<Contact />
			</div>*/}
		</div>
	);
};

export default Home;