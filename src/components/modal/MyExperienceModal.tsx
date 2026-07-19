// components/modal/MyExperienceModal.tsx

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import './MyExperienceModal.css';
import type { Slide } from '../../utils/Data';

interface MyExperienceModalProps {
	experience: Slide | null;
	onClose: () => void;
}

/**
 * Experience detail modal, opened from the experience slider.
 * Shows logo, role/company/period, detailed skill labels and the
 * company / project / impact sections (rendered only when present
 * in the Slide data — fill them in utils/Data.ts).
 */
function MyExperienceModal({ experience, onClose }: MyExperienceModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	const handleClickOutside = (e: React.MouseEvent) => {
		if (modalRef.current === e.target) onClose();
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeBtnRef.current?.focus();
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	if (!experience) return null;

	const formatDate = (dateStr: string) =>
		new Date(dateStr).toLocaleString('default', { month: 'long', year: 'numeric' });

	/* Rendered through a portal: ancestors of the slider (Reveal, Swiper)
	   carry CSS transforms, which would hijack position:fixed and
	   mis-center the overlay depending on scroll position. */
	return createPortal(
		<div
			ref={modalRef}
			onClick={handleClickOutside}
			className='exp-modal-overlay'
			role='dialog'
			aria-modal='true'
			aria-label={`${experience.title} at ${experience.company}`}
		>
			<div className='exp-modal-content'>
				<button
					ref={closeBtnRef}
					onClick={onClose}
					className='exp-modal-close-btn'
					aria-label='Close'
				>
					<X />
				</button>

				{experience.logo && (
					<img
						src={experience.logo}
						alt={`${experience.company} logo`}
						className='exp-modal-logo'
					/>
				)}

				<header className='exp-modal-header'>
					<h2 className='exp-modal-title'>{experience.title}</h2>
					<h3 className='exp-modal-subtitle'>{experience.company}</h3>
					<p className='exp-modal-meta'>
						<span>
							<FaCalendarAlt aria-hidden='true' />
							{formatDate(experience.date_from)} – {formatDate(experience.date_to)}
						</span>
						<span>
							<FaLocationDot aria-hidden='true' />
							{experience.location}
						</span>
					</p>
				</header>

				{experience.skills && experience.skills.length > 0 && (
					<div className='exp-modal-skills' aria-label='Skills'>
						{experience.skills.map((skill) => (
							<span key={skill} className='exp-modal-skill'>
								{skill}
							</span>
						))}
					</div>
				)}

				<div className='exp-modal-body'>
					{experience.companyDescription && (
						<section className='exp-modal-section'>
							<h4>About the company</h4>
							<p>{experience.companyDescription}</p>
						</section>
					)}
					{experience.projectDescription && (
						<section className='exp-modal-section'>
							<h4>The project</h4>
							<p>{experience.projectDescription}</p>
						</section>
					)}
					{experience.impact && (
						<section className='exp-modal-section'>
							<h4>Impact</h4>
							<p>{experience.impact}</p>
						</section>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
}

export default MyExperienceModal;
