import { useMemo, useState, type CSSProperties } from 'react';
import './Portfolio.css';
import { FaChevronDown } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import SectionHeading from '../../layout/SectionHeading/SectionHeading';
import { portfolioItems, type RoleType } from '../../../utils/Data';

const ALL_ROLES = 'All';

/** Unique, sorted values of a field across all portfolio items. */
const collect = (field: 'roleTypes' | 'stack') =>
	[...new Set(portfolioItems.flatMap((item) => item[field] ?? []))].sort();

const Portfolio = () => {
	const roleTypes = useMemo(() => collect('roleTypes'), []);
	const stackOptions = useMemo(() => collect('stack'), []);

	const [activeRole, setActiveRole] = useState<string>(ALL_ROLES);
	const [activeStack, setActiveStack] = useState<string[]>([]);
	const [openGroup, setOpenGroup] = useState<'role' | 'stack' | null>(null);

	const hasActiveFilters = activeRole !== ALL_ROLES || activeStack.length > 0;

	const toggleGroup = (group: 'role' | 'stack') =>
		setOpenGroup((prev) => (prev === group ? null : group));

	const toggleStack = (tech: string) => {
		setActiveStack((prev) =>
			prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
		);
	};

	const clearFilters = () => {
		setActiveRole(ALL_ROLES);
		setActiveStack([]);
	};

	const visibleItems = portfolioItems.filter((item) => {
		const matchesRole =
			activeRole === ALL_ROLES || (item.roleTypes ?? []).includes(activeRole as RoleType);
		const matchesStack =
			activeStack.length === 0 ||
			activeStack.some((tech) => (item.stack ?? []).includes(tech));
		return matchesRole && matchesStack;
	});

	return (
		<section className='portfolio' id='portfolio'>
			<SectionHeading label='Portfolio' title='My Project Portfolio' />

			<div className='portfolio__filters'>
				<div className='portfolio__filter-bar'>
					<button
						type='button'
						className='portfolio__filter-toggle'
						aria-expanded={openGroup === 'role'}
						onClick={() => toggleGroup('role')}
					>
						Role{activeRole !== ALL_ROLES ? `: ${activeRole}` : ''}
						<FaChevronDown
							aria-hidden='true'
							className={`portfolio__filter-caret ${openGroup === 'role' ? 'portfolio__filter-caret--open' : ''}`}
						/>
					</button>
					<button
						type='button'
						className='portfolio__filter-toggle'
						aria-expanded={openGroup === 'stack'}
						onClick={() => toggleGroup('stack')}
					>
						Tech stack{activeStack.length > 0 ? `: ${activeStack.length}` : ''}
						<FaChevronDown
							aria-hidden='true'
							className={`portfolio__filter-caret ${openGroup === 'stack' ? 'portfolio__filter-caret--open' : ''}`}
						/>
					</button>
					{hasActiveFilters && (
						<button
							type='button'
							className='portfolio__clear-filters'
							onClick={clearFilters}
						>
							<FaXmark aria-hidden='true' />
							Clear filters
						</button>
					)}
				</div>

				{openGroup === 'role' && (
					<div className='portfolio__filter-panel' aria-label='Filter projects by role type'>
						{[ALL_ROLES, ...roleTypes].map((role) => (
							<button
								key={role}
								type='button'
								className='portfolio__filter-tab'
								aria-pressed={activeRole === role}
								onClick={() => setActiveRole(role)}
							>
								{role}
							</button>
						))}
					</div>
				)}

				{openGroup === 'stack' && (
					<div className='portfolio__filter-panel' aria-label='Filter projects by tech stack'>
						{stackOptions.map((tech) => (
							<button
								key={tech}
								type='button'
								className='portfolio__filter-chip'
								aria-pressed={activeStack.includes(tech)}
								onClick={() => toggleStack(tech)}
							>
								{tech}
							</button>
						))}
					</div>
				)}
			</div>

			{visibleItems.length === 0 ? (
				<p className='portfolio__empty'>
					No projects match this filter.{' '}
					<button type='button' className='portfolio__clear' onClick={clearFilters}>
						Reset filters
					</button>
				</p>
			) : (
				<div className='portfolio__grid'>
					{visibleItems.map((item, index) => (
						<a
							key={item.id}
							href={item.url}
							className='portfolio__card-wrapper-link'
							target='_blank'
							rel='noopener noreferrer'
						>
							<div className='portfolio__card-wrapper' style={{ '--i': index } as CSSProperties}>
								<div className='portfolio__card'>
									<img src={item.src} alt={item.alt} loading='lazy' />
									<div className='portfolio__card-overlay'>
										<div className='portfolio__card-title'>
											<h3>{item.title}</h3>
										</div>
										<div className='portfolio__categories'>
											{item.categories.map((category, idx) => (
												<span key={idx} style={{ '--i': idx + 1 } as CSSProperties}>
													{category}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			)}
		</section>
	);
};

export default Portfolio;
