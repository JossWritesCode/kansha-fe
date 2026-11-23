import React from 'react';
import heroImage from '../../assets/landing/hero.jpg';
import CTAButton from './CTAButton';

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
				<img
					className="lp-hero__image"
					src={heroImage}
					alt="Three coworkers jumping in celebration"
				/>
			</div>
		</section>
	);
}
