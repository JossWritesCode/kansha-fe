import React from 'react';
import { Link } from 'react-router-dom';

/* The "← Previous step" link at the bottom of onboarding/upload pages */
const BackLink = ({ to, children = 'Previous step' }) => (
	<div className="step-p-container">
		<span className="previousarrow">
			<i className="fas fa-arrow-left" />
			<Link to={to}>
				<p>{children}</p>
			</Link>
		</span>
	</div>
);

export default BackLink;
