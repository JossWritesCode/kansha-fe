import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from '../Landing/Header';
import Footer from '../Landing/Footer';
import ProgressBar from './ProgressBar';
import S1GetStarted from './S1GetStarted';
import S2CreateAccount from './S2CreateAccount';
import S4AUserUpload from './S4AUserUpload';
import S6AllDone from './S6AllDone';
import EmployeeForm from '../UserUpload/EmployeeForm';
import CsvUpload from '../UserUpload/CsvUpload';
import BackLink from '../UserUpload/BackLink';
import onboardingPic from '../../assets/onboardingPic.png';

const ALL_DONE = '/onboarding/step-6';

function Onboarding() {
	const history = useHistory();
	const [user, setUser] = useState({
		first_name: '',
		last_name: '',
		job_title: '',
		user_type: 'admin',
		org_name: '',
		company_size: '',
		industry: '',
	});

	const handleUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Header />
			<div className="s1-parent-container">
				<ProgressBar />
				<div className="s1-img">
					<img src={onboardingPic} alt="staff-meeting-pic"></img>
				</div>
				<div className="s1-getting-started">
					<Switch>
						<Route
							path="/onboarding/step-1"
							component={S1GetStarted}
						/>
						<Route path="/onboarding/step-2">
							<S2CreateAccount
								user={user}
								setUser={setUser}
								handleUser={handleUser}
							/>
						</Route>
						<Route
							path="/onboarding/step-4"
							exact
							component={S4AUserUpload}
						/>
						<Route path="/onboarding/step-4b">
							<EmployeeForm
								titleClassName="employee-upload-title"
								onDone={() => history.push(ALL_DONE)}
							/>
							<BackLink to="/onboarding/step-4" />
						</Route>
						<Route path="/onboarding/step-4c">
							<CsvUpload />
							<button onClick={() => history.push(ALL_DONE)}>
								Next
							</button>
							<BackLink to="/onboarding/step-4" />
						</Route>
						<Route path={ALL_DONE} component={S6AllDone} />
						<Redirect to="/onboarding/step-1" />
					</Switch>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Onboarding;
