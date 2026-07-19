import React, { useEffect, useRef } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

import './MyModal.css';

/**
 * Resume modal: themed dialog with a header action bar
 * (download / LinkedIn / close) and an inline PDF preview.
 * Mobile browsers can't render inline PDFs, so below 768px the
 * preview is replaced by a prominent "open resume" card.
 */
function MyModal({ onClose }: { onClose: () => void }) {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const isMobile = window.innerWidth < 768;

	// Close on background click
	const handleClickOutside = (e: React.MouseEvent) => {
		if (modalRef.current === e.target) {
			onClose();
		}
	};

	// Close on ESC key press
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	// Prevent background scroll while modal is open; focus the close button
	useEffect(() => {
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeBtnRef.current?.focus();

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, []);

	return (
		<div
			ref={modalRef}
			onClick={handleClickOutside}
			className='modal-overlay'
			role='dialog'
			aria-modal='true'
			aria-label='Resume'
		>
			<div className='modal-content'>
				<header className='modal-header'>
					<h2 className='modal-title'>My Resume</h2>
					<div className='modal-actions'>
						<a
							href='/Resume_LucPellinger.pdf'
							download
							className='modal-action'
						>
							<Download size={16} aria-hidden='true' />
							<span>Download</span>
						</a>
						<a
							href='https://www.linkedin.com/in/luc-pellinger/'
							target='_blank'
							rel='noopener noreferrer'
							className='modal-action'
						>
							<FaLinkedin aria-hidden='true' />
							<span>LinkedIn</span>
						</a>
						<button
							ref={closeBtnRef}
							onClick={onClose}
							className='modal-close-btn'
							aria-label='Close modal'
						>
							<X />
						</button>
					</div>
				</header>

				<p className='modal-note'>
					Created with LaTeX. For questions or opportunities, feel free to
					reach out on LinkedIn.
				</p>

				{isMobile ? (
					<a
						href='/Resume_LucPellinger.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className='modal-mobile-open'
					>
						<ExternalLink aria-hidden='true' />
						<span className='modal-mobile-open__title'>Open resume (PDF)</span>
						<span className='modal-mobile-open__hint'>
							Opens in a new tab — best viewed there on mobile
						</span>
					</a>
				) : (
					<object
						data='/Resume_LucPellinger.pdf'
						type='application/pdf'
						className='pdf-container'
					>
						<a
							href='/Resume_LucPellinger.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='modal-mobile-open'
						>
							<ExternalLink aria-hidden='true' />
							<span className='modal-mobile-open__title'>Open resume (PDF)</span>
							<span className='modal-mobile-open__hint'>
								Your browser cannot preview PDFs inline
							</span>
						</a>
					</object>
				)}
			</div>
		</div>
	);
}

export default MyModal;
