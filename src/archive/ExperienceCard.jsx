// components/experience/ExperienceCard.jsx
import '../../pages/home.css'; // adjust the path if needed


const ExperienceCard = ({ experience, onClick }) => {
	return (
		<div className='testimonials__card' onClick={onClick} style={{ cursor: 'pointer' }}>
			<div className='testimonials__text'>{experience.summary}</div>
			<div className='testimonials__author'>{experience.company}</div>
			<div className='testimonials__author-title'>{experience.role}</div>
		</div>
	);
};

export default ExperienceCard;