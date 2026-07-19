import React, { useMemo, useState } from 'react';
import './Portfolio.css';
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
				<div className='portfolio__filter-row' aria-label='Filter projects by role type'>
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
				<div className='portfolio__filter-row' aria-label='Filter projects by tech stack'>
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
			</div>

			{visibleItems.length === 0 ? (
				<p className='portfolio__empty'>
					No projects match this filter.{' '}
					<button type='button' className='portfolio__clear' onClick={clearFilters}>
						Clear filters
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
							<div className='portfolio__card-wrapper' style={{ '--i': index } as React.CSSProperties}>
								<div className='portfolio__card'>
									<img src={item.src} alt={item.alt} loading='lazy' />
									<div className='portfolio__card-overlay'>
										<div className='portfolio__card-title'>
											<h3>{item.title}</h3>
										</div>
										<div className='portfolio__categories'>
											{item.categories.map((category, idx) => (
												<span key={idx} style={{ '--i': idx + 1 } as React.CSSProperties}>
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
