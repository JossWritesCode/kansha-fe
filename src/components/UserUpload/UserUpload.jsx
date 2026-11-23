import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BulkOrSingle from './BulkOrSingle';
import EmployeeForm from './EmployeeForm';
import CsvUpload from './CsvUpload';
import BackLink from './BackLink';

/* Admin page for adding employees after onboarding */
function UserUpload() {
	return (
		<div className="user-upload-container-outter">
			<div className="user-upload-container">
				<Switch>
					<Route exact path="/add-user" component={BulkOrSingle} />
					<Route path="/add-user/single">
						<EmployeeForm />
						<BackLink to="/add-user">Previous Page</BackLink>
					</Route>
					<Route path="/add-user/bulk">
						<CsvUpload buttonClassName="user-upload-buttons" />
						<BackLink to="/add-user">Previous Page</BackLink>
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default UserUpload;
