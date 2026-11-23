import { loginErrorMessage } from '../components/Auth/LoginError';

describe('loginErrorMessage', () => {
	it('stays quiet for a visitor who just is not logged in', () => {
		expect(loginErrorMessage(null, false)).toBeNull();
		expect(
			loginErrorMessage({ status: 401, data: { message: 'x' } }, false),
		).toBeNull();
	});

	it('explains a server error', () => {
		expect(
			loginErrorMessage(
				{
					status: 503,
					data: { message: 'Unable to verify credentials' },
				},
				true,
			),
		).toMatch(/Unable to verify credentials/);
	});

	it('explains a 401 for a token that should still be valid', () => {
		expect(
			loginErrorMessage(
				{ status: 401, data: { message: 'jwt audience invalid' } },
				true,
			),
		).toMatch(/jwt audience invalid/);
	});

	it('explains network errors', () => {
		expect(loginErrorMessage({ status: 0, data: {} }, false)).toMatch(
			/reach/,
		);
	});

	it('explains auth0 callback errors', () => {
		expect(
			loginErrorMessage(
				{ error: 'access_denied', errorDescription: 'nope' },
				false,
			),
		).toMatch(/nope/);
	});
});
