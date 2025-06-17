import React from 'react';
import './Portfolio.css';
import { portfolioItems } from '../../../utils/Data'; // Assuming you have a Data.js file with portfolio items



const Portfolio = () => {
	return (
		<section className='portfolio' id='portfolio'>
			<h3 className='section__label'>Portfolio</h3>
			<h2 className='section__title'>My Project Portfolio</h2>
			<div className='portfolio__grid'>
				{portfolioItems.map((item, index) => (
					<a href={item.url} onClick={() => window.open(item.url, '_blank')} className='portfolio__card-wrapper-link' target='_blank' rel='noopener noreferrer'>
					<div className='portfolio__card-wrapper' key={index} style={{ '--i': index }}>
					{/* Using a div instead of an anchor tag for the card wrapper */}
						{/* This allows for more flexibility in styling and interaction */}
						<div className='portfolio__card'>
							<img src={item.src} alt={item.alt} />
							<div className='portfolio__card-title'><h3>{item.title}</h3></div>
							<div className="portfolio__categories">
                            	    {item.categories.map((category, idx) => (
                            	        <span key={idx} style={{"--i": idx + 1}}>
                            	            {category}
                            	        </span>
                            	    ))}
                            </div>
						</div>
					</div>
					</a>
				))}
			</div>
		</section>
	);
};

export default Portfolio;
