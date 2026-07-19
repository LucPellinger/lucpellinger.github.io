import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ icon, title, features }) => {
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

Card.propTypes = {
	icon: PropTypes.elementType,
	title: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.string),
};

export default Card;