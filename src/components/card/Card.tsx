import React from 'react';
import type { IconType } from 'react-icons';
import './Card.css';

interface CardProps {
	icon: IconType;
	title: string;
	features?: string[];
}

const Card = ({ icon, title, features }: CardProps) => {
	return (
		<div className='card'>
			<div className='card__inner'>
				<div className='card__icon'>{React.createElement(icon)}</div>
				<div className='card__title'>{title}</div>
				<div className='card__features'>
					{features?.map((feature) => (
						<p key={feature}>{feature}</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card;
