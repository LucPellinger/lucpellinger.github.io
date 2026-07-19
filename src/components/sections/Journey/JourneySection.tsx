import React, { useState, Suspense, lazy } from 'react';
import './JourneySection.css';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import Journey from './Journey';

// Lazy-loaded so the globe component + its map data (~150KB) live in their
// own chunk instead of the main bundle.
const GlobeJourney = lazy(() => import('../GlobeJourney/GlobeJourney'));

/**
 * Journey section with a segmented toggle between two views:
 * the horizontal timeline and the interactive 3D globe.
 */
const JourneySection = () => {
	const [view, setView] = useState<'globe' | 'timeline'>('globe');

	return (
		<section className='journey' id='journey'>
			<h3 className='section__label'>Journey</h3>
			<div className='journey__header'>
				<h2 className='section__title journey__title'>Stations of My Journey</h2>
				<div className='journey__view-toggle' role='group' aria-label='Journey view'>
					<button
						type='button'
						aria-pressed={view === 'globe'}
						onClick={() => setView('globe')}
					>
						Globe
					</button>
					<button
						type='button'
						aria-pressed={view === 'timeline'}
						onClick={() => setView('timeline')}
					>
						Timeline
					</button>
				</div>
			</div>
			{view === 'globe' ? (
				<Suspense fallback={<p className='journey__globe-loading'>Loading globe…</p>}>
					<GlobeJourney />
				</Suspense>
			) : (
				<Journey />
			)}
		</section>
	);
};

export default JourneySection;
