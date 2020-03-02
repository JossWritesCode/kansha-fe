import React from 'react';

import Footer from '../Landing/Footer';
import Header from '../Landing/Header';
import SideBar from '../SideBar';
import Teams from './Teams';
import Reports from './Reports';
import Activity from './Activity';

const AdminDashboard = () => {
	return (
		<div>
			<SideBar />
			<div className="admin-dashboard">
				<Header />
				<main>
					<div className="teams-reports">
						<Teams />
						<Reports />
					</div>
					<Activity />
				</main>
				<Footer />
			</div>
		</div>
	);
};

export default AdminDashboard;
