import './SectionHeading.css';

interface SectionHeadingProps {
	label: string;
	title: string;
}

/** Consistent section heading: small label above the display title. */
const SectionHeading = ({ label, title }: SectionHeadingProps) => (
	<>
		<h3 className='section__label'>{label}</h3>
		<h2 className='section__title'>{title}</h2>
	</>
);

export default SectionHeading;
