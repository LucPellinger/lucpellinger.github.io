import React from 'react';
import './Home.css';
import Band from '../components/layout/Band/Band';
import ScrollDownHint from '../components/layout/ScrollDownHint/ScrollDownHint';
import Reveal from '../components/reveal/Reveal';
import Hero from '../components/sections/Hero/Hero';
import Portfolio from '../components/sections/Portfolio/Portfolio';
import JourneySection from '../components/sections/Journey/JourneySection';
import Experience from '../components/sections/Experience/Experience';
import Education from '../components/sections/Academic/Education';
import TechSkills from '../components/sections/TechSkills/TechSkills';
import Badges from '../components/sections/Badges/Badges';
import LanguageSkills from '../components/sections/LanguageSkills/LanguageSkills';

/**
 * Page composition: full-bleed <Band>s alternate content sections with
 * empty interludes where the scroll-driven background animation forms
 * its shapes (see ScrollBackground.jsx).
 */
const Home = ({ onResumeClick }: { onResumeClick: () => void }) => (
	<div className='home' id='home'>
		<Band hero>
			<Hero onResumeClick={onResumeClick} />
			<ScrollDownHint href='#portfolio' label='Scroll to Portfolio' />
		</Band>

		<Band interlude id='interlude-cube' />

		<Band alt>
			<Reveal>
				<Portfolio />
			</Reveal>
		</Band>

		<Band interlude id='interlude-pin' />

		{/* opaque: the background animation would distract from the globe */}
		<Band opaque>
			<Reveal>
				<JourneySection />
			</Reveal>
		</Band>

		<Band>
			<Reveal>
				<Experience />
			</Reveal>
		</Band>

		<Band alt>
			<Reveal>
				<Education />
			</Reveal>
		</Band>

		<Band interlude id='interlude-x' />

		<Band alt>
			<Reveal>
				<TechSkills />
			</Reveal>
		</Band>

		<Band>
			<Reveal>
				<Badges />
			</Reveal>
		</Band>

		<Band alt>
			<Reveal>
				<LanguageSkills />
			</Reveal>
		</Band>

		<Band interlude id='interlude-lp' />
	</div>
);

export default Home;
