import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SideBar from './SideBar';
import Modal from './Modal';
import HelpModal from './HelpModal/HelpModal';
import FeedSideBar from './FeedSideBar';

const WELCOME_TEXT =
	'We are excited that you are adding Kansha to your employee recognition program! We’ve included some helpful tips to get you started but you can explore on your own. Once you’ve begun creating teams and budgets your dashboard will conveniently provide an overview for you upon logging in. If you need help later on, you can find common answers in the help menu!';

const Dashboard = ({ children }) => {
	const firstName = useSelector((state) => state.user.profile.first_name);

	const [helpModal, setHelpModal] = useState(false);
	const [title, setTitle] = useState(`Welcome, ${firstName}!`);
	const [content, setContent] = useState(WELCOME_TEXT);

	const location = useLocation();
	const history = useHistory();

	// The sidebar's "Get help" link adds ?help to the URL
	useEffect(() => {
		if (new URLSearchParams(location.search).has('help')) {
			setHelpModal(true);
			history.replace(location.pathname);
		}
	}, [location, history]);

	return (
		<div className="app-canvas">
			<SideBar />
			<FeedSideBar />
			{children}
			{helpModal && (
				<Modal close={setHelpModal} className="modal--help">
					<HelpModal
						title={title}
						content={content}
						setTitle={setTitle}
						setContent={setContent}
						setHelpModal={setHelpModal}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Dashboard;
