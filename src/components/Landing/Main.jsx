import React from 'react';
import heroImage from '../../assets/landing/team-high-five.jpg';
import CTAButton from './CTAButton';

/*
	A short ribbon folded over the photo's upper-right corner, like the band
	on the gift logo. Purely decorative.
*/
const Ribbon = () => (
	<svg
		className="lp-hero__ribbon"
		viewBox="0 0 24 64"
		aria-hidden="true"
		focusable="false">
		{/* the fold over the frame's top edge */}
		<path d="M3 0 L21 0 L24 7 L0 7 Z" fill="#951442" />
		{/* the tail, notched like a ribbon end */}
		<path d="M0 7 L24 7 L24 64 L12 55 L0 64 Z" fill="#B71952" />
	</svg>
);

export default function Main() {
	return (
		<section className="lp-section lp-hero">
			<div className="lp-container lp-hero__inner">
				<div className="lp-hero__text">
					<h1 className="lp-hero__title">
						<span className="lp-hero__lead">Workplace recognition.</span>
						<span className="lp-hero__accent">Redefined.</span>
					</h1>
					<p className="lp-hero__body">
						Making it easy to recognize your hardworking peers with
						rewards and personalized messages.
					</p>
					<CTAButton>Join today</CTAButton>
				</div>
				<figure className="lp-hero__photo">
					<img
						className="lp-hero__image"
						src={heroImage}
						alt="Four smiling coworkers sharing a high five in a bright office"
					/>
					<Ribbon />
				</figure>
			</div>
		</section>
	);
}
