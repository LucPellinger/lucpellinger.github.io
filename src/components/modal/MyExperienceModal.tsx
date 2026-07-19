// components/modal/MyExperienceModal.tsx

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './MyExperienceModal.css';

export interface ExperienceModalData {
	logo: string;
	company: string;
	role: string;
	location: string;
	period: string;
	description: string;
}

interface MyExperienceModalProps {
	experience: ExperienceModalData | null;
	onClose: () => void;
}

function MyExperienceModal({ experience, onClose }: MyExperienceModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);

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

	if (!experience) return null;

	return (
		<div ref={modalRef} onClick={handleClickOutside} className="exp-modal-overlay">
			<div className="exp-modal-content">
				<button onClick={onClose} className="exp-modal-close-btn" aria-label="Close">
					<X />
				</button>

				<img src={experience.logo} alt={`${experience.company} logo`} className="exp-modal-logo" />

				<h2 className="exp-modal-title">{experience.role}</h2>
				<h3 className="exp-modal-subtitle">
					{experience.company} — {experience.location}
				</h3>
				<p className="exp-modal-period">{experience.period}</p>

				<div className="exp-modal-description">
					{experience.description.split('\n').map((line, index) => (
						<p key={index}>{line.replace(/^[-–•]\s*/, '')}</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default MyExperienceModal;
