import React, { useState } from 'react';

/*
	Explains why a login attempt failed. A visitor who simply isn't logged in
	also lands here with a 401 from /profile, so only speak up when there was
	a real attempt: an auth0 callback error, or a still-valid token the API
	rejected or couldn't check.
*/
export const loginErrorMessage = (error, hasValidToken) => {
	if (!error) return null;

	// auth0 callback errors (parseHash) look like { error, errorDescription }
	if (error.error) {
		return `Auth0 couldn't complete the login: ${error.errorDescription ||
			error.error}`;
	}

	const status = error.status;
	const detail = error.data && error.data.message;
	if (status === 0) {
		return "We couldn't reach the Kansha server. Check your connection and try again.";
	}
	if (status >= 500 || (status === 401 && hasValidToken)) {
		return `We couldn't sign you in${detail ? `: ${detail}` : '.'}`;
	}
	return null;
};

const LoginError = ({ error, hasValidToken, onRetry }) => {
	const [dismissed, setDismissed] = useState(false);
	const message = loginErrorMessage(error, hasValidToken);
	if (!message || dismissed) return null;

	return (
		<div className="login-error" role="alert">
			<p className="login-error__message">{message}</p>
			<div className="login-error__actions">
				<button type="button" onClick={onRetry}>
					Try again
				</button>
				<button
					type="button"
					aria-label="Dismiss"
					onClick={() => setDismissed(true)}>
					×
				</button>
			</div>
		</div>
	);
};

export default LoginError;
