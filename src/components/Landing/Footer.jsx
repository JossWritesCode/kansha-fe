import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Auth from '../../utils/auth';

const auth = new Auth();

export default function Footer() {
	return (
		<footer className="lp-footer">
			<div className="lp-footer__inner">
				<div className="lp-footer__brand">
					<Link to="/" className="lp-brand" aria-label="Kansha home">
						<Logo className="lp-brand__logo" aria-hidden="true" />
						<span className="lp-brand__name">Kansha</span>
					</Link>
					<p className="lp-footer__copy">
						© Kansha {new Date().getFullYear()}. We love our users!
					</p>
				</div>
				<nav aria-label="Footer navigation">
					<ul className="lp-footer__nav">
						<li>
							<Link to="/aboutus" className="lp-footer__link">
								Team
							</Link>
						</li>
						<li>
							<button
								type="button"
								className="lp-footer__link"
								onClick={auth.login}
								data-test="login">
								Login
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
}
