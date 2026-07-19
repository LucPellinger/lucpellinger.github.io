import React from 'react';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import Slider from '../../slider/Slider';

/** Professional experience section (slider of stations). */
const Experience = () => (
	<section className='experience' id='experience'>
		<SectionHeading label='Experience' title='Professional Experience' />
		<div className='experience__wrapper'>
			<Slider />
		</div>
	</section>
);

export default Experience;
