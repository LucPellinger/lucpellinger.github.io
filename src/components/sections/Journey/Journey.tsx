import React, { useState } from 'react';
import './Journey.css';
import { FaLocationDot } from 'react-icons/fa6';
import { journeyStops } from '../../../utils/Data';
import { formatPeriod } from '../../../utils/format';

/**
 * Vertical timeline of the places Luc has lived: a central line with
 * stops alternating left/right (single left-lined column on mobile).
 * Clicking a stop's number centers that station on screen, so the
 * visitor can click through the journey step by step.
 */
const Journey = () => {
	const [activeStop, setActiveStop] = useState<number | null>(null);

	const centerStop = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		setActiveStop(index);
		const li = e.currentTarget.closest('li');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		li?.scrollIntoView?.({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
	};

	return (
		<ol className='journey__track' aria-label='Places I have lived, in order'>
			{journeyStops.map((stop, index) => (
				<li
					key={stop.id}
					className={[
						'journey__stop',
						stop.current ? 'journey__stop--current' : '',
						activeStop === index ? 'journey__stop--active' : '',
					]
						.filter(Boolean)
						.join(' ')}
					style={{ '--i': index } as React.CSSProperties}
					aria-current={activeStop === index ? 'step' : undefined}
				>
					<button
						type='button'
						className='journey__marker'
						aria-label={`Center stop ${index + 1}: ${stop.place}`}
						onClick={(e) => centerStop(e, index)}
					>
						{stop.current ? <FaLocationDot aria-hidden='true' /> : index + 1}
					</button>
					<div className='journey__details'>
						<h3 className='journey__place'>{stop.place}</h3>
						<p className='journey__region'>
							{stop.region} <span className='journey__country'>{stop.country}</span>
						</p>
						{formatPeriod(stop.date_from, stop.date_to, stop.current) && (
							<p className='journey__period'>
								{formatPeriod(stop.date_from, stop.date_to, stop.current)}
							</p>
						)}
						{stop.note && <p className='journey__note'>{stop.note}</p>}
						{stop.chapter && <p className='journey__chapter'>{stop.chapter}</p>}
					</div>
				</li>
			))}
		</ol>
	);
};

export default Journey;
