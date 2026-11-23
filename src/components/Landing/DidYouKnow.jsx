import React from 'react';
import adminDashboard from '../../assets/landing/admin-dashboard.png';
import CTAButton from './CTAButton';

export default function DidYouKnow() {
	return (
		<section className="lp-section lp-section--tinted lp-stats" data-test="didyouknow">
			<div className="lp-container lp-split">
				<div className="lp-split__text">
					<h2 className="lp-heading">Did you know...</h2>
					<p className="lp-body">
						Companies with robust employee recognition programs are
						known to have 31% lower voluntary turnover than those
						that don’t (Anderson, 2018).
					</p>
					<div className="lp-actions">
						<CTAButton>Get started</CTAButton>
						<a
							className="lp-link"
							href="https://www.youtube.com/watch?v=8Ybqd9pAFk0"
							target="_blank"
							rel="noopener noreferrer">
							Watch the demo video
						</a>
					</div>
				</div>
				<img
					className="lp-split__image lp-stats__image"
					src={adminDashboard}
					alt="Kansha admin dashboard showing recognition analytics and a leaderboard"
				/>
			</div>
		</section>
	);
}
