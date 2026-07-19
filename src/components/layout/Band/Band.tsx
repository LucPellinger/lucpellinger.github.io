import type { ReactNode } from 'react';
import './Band.css';

interface BandProps {
	children?: ReactNode;
	/** Subtle tinted background (alternating rhythm). */
	alt?: boolean;
	/** Solid background that blocks the fixed particle canvas. */
	opaque?: boolean;
	/** Empty stage for the scroll-driven background animation. */
	interlude?: boolean;
	/** Reduced top padding (used directly under the fixed header). */
	hero?: boolean;
	id?: string;
	className?: string;
}

/**
 * Full-bleed horizontal page band. The band spans the entire viewport width
 * (and can carry a background); content is constrained by .band__inner.
 */
const Band = ({ children, alt, opaque, interlude, hero, id, className = '' }: BandProps) => {
	const classes = [
		'band',
		alt && 'band--alt',
		opaque && 'band--opaque',
		interlude && 'band--interlude',
		hero && 'band--hero',
		className,
	]
		.filter(Boolean)
		.join(' ');

	if (interlude) {
		return <div id={id} className={classes} aria-hidden='true'></div>;
	}

	return (
		<div id={id} className={classes}>
			<div className='band__inner'>{children}</div>
		</div>
	);
};

export default Band;
