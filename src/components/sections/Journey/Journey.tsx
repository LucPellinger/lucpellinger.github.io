import React from 'react';
import './Journey.css';
import { FaLocationDot } from 'react-icons/fa6';
import { journeyStops } from '../../../utils/Data';

/**
 * Vertical timeline of the places Luc has lived: a central line with
 * stops alternating left/right (single left-lined column on mobile).
 * Rendered inside JourneySection (which provides the heading and the
 * Timeline/Globe view toggle).
 */
const Journey = () => (
	<ol className='journey__track' aria-label='Places I have lived, in order'>
		{journeyStops.map((stop, index) => (
			<li
				key={stop.id}
				className={`journey__stop ${stop.current ? 'journey__stop--current' : ''}`}
				style={{ '--i': index } as React.CSSProperties}
			>
				<span className='journey__marker' aria-hidden='true'>
					{stop.current ? <FaLocationDot /> : index + 1}
				</span>
				<div className='journey__details'>
					<h3 className='journey__place'>{stop.place}</h3>
					<p className='journey__region'>
						{stop.region} <span className='journey__country'>{stop.country}</span>
					</p>
					{stop.note && <p className='journey__note'>{stop.note}</p>}
					{stop.chapter && <p className='journey__chapter'>{stop.chapter}</p>}
				</div>
			</li>
		))}
	</ol>
);

export default Journey;
