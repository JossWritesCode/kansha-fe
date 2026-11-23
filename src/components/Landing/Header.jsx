import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Auth from '../../utils/auth';

const auth = new Auth();

export default function Header() {
	return (
		<header className="lp-header">
			<div className="lp-header__inner">
				<Link to="/" className="lp-brand" aria-label="Kansha home">
					<Logo className="lp-brand__logo" aria-hidden="true" />
					<span className="lp-brand__name">Kansha</span>
				</Link>
				<nav className="lp-header__nav" aria-label="Main navigation">
					<Link to="/aboutus" className="lp-header__link">
						Team
					</Link>
					<button
						type="button"
						className="lp-header__link lp-header__login"
						onClick={auth.login}
						data-test="login">
						Login
					</button>
				</nav>
			</div>
		</header>
	);
}
