import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';

import { login, authorizeUser } from './store/actions/user-actions';
import { selectIsAdmin } from './store/selectors';
import Auth from './utils/auth';
import { Login } from './components/Auth';
import LoginError from './components/Auth/LoginError';
import AboutUs from './components/Landing/AboutUs';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding/Onboarding';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { Profile } from './components/Profile';
import Workspace from './components/Workspace';
import FileUpload from './components/FileUpload';
import Settings from './components/Settings';
import UserUpload from './components/UserUpload/UserUpload';
import OrganizationHome from './components/AdminTeams/OrganizationHome';
import TeamMemberList from './components/AdminTeams/TeamMemberList';

const auth = new Auth();

export const App = () => {
	const [init, setInit] = useState({
		fetched: false,
		error: false,
		onboarding: false,
	});
	const profileId = useSelector((state) => state.user.profile.id);
	const error = useSelector((state) => state.user.error);
	const isOnboarding = useSelector((state) => state.user.isOnboarding);
	const isAdmin = useSelector(selectIsAdmin);
	const dispatch = useDispatch();
	const history = useHistory();

	// Runs once: either finish an auth0 redirect or load the user
	useEffect(() => {
		if (window.location.hash) {
			dispatch(authorizeUser(auth));
		} else {
			dispatch(login());
		}
	}, [dispatch]);

	useEffect(() => {
		if (profileId) {
			setInit((prev) => ({ ...prev, fetched: true }));
		} else if (error) {
			setInit((prev) => ({ ...prev, fetched: true, error: true }));
		} else if (isOnboarding) {
			setInit((prev) => ({ ...prev, fetched: true, onboarding: true }));
			history.push('/onboarding/step-1');
		}
	}, [profileId, error, isOnboarding, history]);

	if (init.error) {
		return (
			<>
				<LoginError
					error={error}
					hasValidToken={auth.isAuthenticated()}
					onRetry={auth.login}
				/>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/login" component={Login} />
					<Route path="/aboutus" component={AboutUs} />
					<Redirect to="/" />
				</Switch>
			</>
		);
	}

	if (init.onboarding) {
		return <Route path="/onboarding" component={Onboarding} />;
	}

	if (init.fetched) {
		return (
			<Dashboard>
				<Switch>
					<Route
						exact
						path="/"
						component={isAdmin ? AdminDashboard : Profile}
					/>
					<Route exact path="/profile" component={Profile} />
					<Route path="/workspace" component={Workspace} />
					<Route
						exact
						path="/organization"
						component={OrganizationHome}
					/>
					<Route exact path="/teams/:id" component={TeamMemberList} />
					<Route path="/upload" component={FileUpload} />
					<Route path="/settings" component={Settings} />
					<Route path="/add-user" component={UserUpload} />
					<Redirect to="/" />
				</Switch>
			</Dashboard>
		);
	}

	return <Loader type="Rings" color="#b71952" height={100} width={100} />;
};
