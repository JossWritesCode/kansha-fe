import React from 'react';
import Auth from '../../utils/auth';

const auth = new Auth();

export default function CTAButton({ children = 'Get started', onClick }) {
	return (
		<button
			type="button"
			className="lp-cta"
			onClick={onClick || auth.login}
			data-test="cta">
			{children}
		</button>
	);
}
