import './ScrollDownHint.css';
import { FaChevronDown } from 'react-icons/fa';

interface ScrollDownHintProps {
	href: string;
	label: string;
}

/** Bouncing chevron with a tooltip inviting the visitor to scroll on. */
const ScrollDownHint = ({ href, label }: ScrollDownHintProps) => (
	<div className='scroll-hint'>
		<div className='scroll-hint__tooltip'>
			<a href={href} className='scroll-hint__link' aria-label={label}>
				<FaChevronDown />
			</a>
			<span className='scroll-hint__text'>{label}</span>
		</div>
	</div>
);

export default ScrollDownHint;
