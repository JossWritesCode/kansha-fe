import React from 'react';
import engagedTeam from '../../assets/landing/engaged-team-meeting.jpg';
import teamCelebrating from '../../assets/landing/hero.jpg';
import workStation from '../../assets/landing/work-station.jpg';
import CTAButton from './CTAButton';

const results = [
	{
		src: engagedTeam,
		alt: 'Four smiling coworkers in an engaging team meeting',
		text: "Get employees in touch with your organization's values.",
	},
	{
		src: teamCelebrating,
		alt: 'Three coworkers jumping in celebration on a snowy path',
		text: 'Reduce voluntary turnover.',
	},
	{
		src: workStation,
		alt: 'Desk with a computer, a plant and a cup of coffee',
		text: 'Improve productivity, engagement, and innovation.',
	},
];

export default function ResultsYouCanSee() {
	return (
		<section className="lp-section lp-section--tinted lp-results">
			<div className="lp-container">
				<h2 className="lp-heading">
					Results you can <em className="lp-results__see">see</em>.
				</h2>
				<p className="lp-results__sub">Watch it work for you.</p>
				<ul className="lp-results__grid">
					{results.map(({ src, alt, text }) => (
						<li className="lp-result" key={text}>
							<img className="lp-result__image" src={src} alt={alt} />
							<p className="lp-result__text">{text}</p>
						</li>
					))}
				</ul>
				<div className="lp-results__cta">
					<CTAButton>Get started</CTAButton>
				</div>
			</div>
		</section>
	);
}
