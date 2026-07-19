import React from 'react';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import AcademicTiles from './AcademicTiles';

/** Academic background section (heading + tiles). */
const Education = () => (
	<section className='education' id='education'>
		<SectionHeading label='Education' title='Academic Background' />
		<div className='education__wrapper'>
			<AcademicTiles />
		</div>
	</section>
);

export default Education;
