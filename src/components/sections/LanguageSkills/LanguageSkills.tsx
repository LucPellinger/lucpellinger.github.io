import React, { useEffect, useRef } from 'react';
import './LanguageSkills.css';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import { languages } from '../../../utils/Data';

/**
 * Language skills section. Progress bars animate to their percentage
 * the first time the section scrolls into view.
 */
const LanguageSkills = () => {
	const sectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;

		const animate = () => {
			node.querySelectorAll<HTMLElement>('.skill__progress-line').forEach((bar) => {
				bar.style.width = `${bar.getAttribute('data-width')}%`;
			});
		};

		if (typeof IntersectionObserver === 'undefined') {
			animate();
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animate();
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<section className='skill' id='languageskills' ref={sectionRef}>
			<div className='skill__left'>
				<SectionHeading label='Languages' title='My Language Skills' />
				<a href='/Resume_LucPellinger.pdf' download className='button'>
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
	);
};

export default LanguageSkills;
