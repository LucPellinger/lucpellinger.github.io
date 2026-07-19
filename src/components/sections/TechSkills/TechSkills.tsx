import React from 'react';
import './TechSkills.css';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import Card from '../../card/Card';
import { cards } from '../../../utils/Data';

/** Technology skills section (grid of skill cards from Data.js). */
const TechSkills = () => (
	<section className='services' id='skills'>
		<SectionHeading label='Skills' title='My Technology Skills' />
		<div className='cards'>
			{cards?.map((card) => (
				<Card
					key={card?.title}
					icon={card?.icon}
					title={card?.title}
					features={card?.features}
				/>
			))}
		</div>
	</section>
);

export default TechSkills;
