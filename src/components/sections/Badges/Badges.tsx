import './Badges.css';
import { FaAward } from 'react-icons/fa';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import { badges } from '../../../utils/Data';
import { formatMonthYear } from '../../../utils/format';

/**
 * Professional badges & certifications (Accredible, Snowflake, ...).
 * Data lives in utils/Data.ts (`badges`): set `image` to the hosted badge
 * image URL when available — a themed award icon is shown otherwise.
 */
const Badges = () => (
	<section className='badges' id='badges'>
		<SectionHeading label='Badges' title='Certifications & Badges' />
		<div className='badges__grid'>
			{badges.map((badge) => {
				const card = (
					<article className='badges__card'>
						{badge.image ? (
							<img
								src={badge.image}
								alt={`${badge.title} badge`}
								className='badges__image'
								loading='lazy'
							/>
						) : (
							<span className='badges__icon' aria-hidden='true'>
								<FaAward />
							</span>
						)}
						<h3 className='badges__title'>{badge.title}</h3>
						<p className='badges__meta'>
							<span className='badges__issuer'>{badge.issuer}</span>
							{badge.date && (
								<span className='badges__date'>{formatMonthYear(badge.date)}</span>
							)}
						</p>
					</article>
				);

				return badge.url ? (
					<a
						key={badge.id}
						href={badge.url}
						target='_blank'
						rel='noopener noreferrer'
						className='badges__link'
						aria-label={`${badge.title} — view credential`}
					>
						{card}
					</a>
				) : (
					<div key={badge.id} className='badges__link'>
						{card}
					</div>
				);
			})}
		</div>
	</section>
);

export default Badges;
