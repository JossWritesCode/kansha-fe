import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';

import Auth from '../../utils/auth';

const auth = new Auth();

function Login() {
	useEffect(() => {
		auth.login();
	}, []);

	return (
		<Loader
			type="Rings"
			color="#b71952"
			height={100}
			width={100}
			timeout={10000}
		/>
	);
}

export default Login;
