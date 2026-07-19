import { useEffect, useRef, useState, type ReactNode } from 'react';
import './Reveal.css';

interface RevealProps {
	children?: ReactNode;
	delay?: number;
	className?: string;
}

/**
 * Wraps content and fades/slides it in when it scrolls into view.
 * Respects prefers-reduced-motion (handled in Reveal.css).
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		if (typeof IntersectionObserver === 'undefined') {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisible(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
};

export default Reveal;
