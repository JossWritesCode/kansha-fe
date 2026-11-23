import React from 'react';
import { ReactComponent as TeamIcon } from '../../assets/HelpModalImgs/Teams.svg';
import { ReactComponent as BadgeIcon } from '../../assets/HelpModalImgs/Badges.svg';
import { ReactComponent as RecogIcon } from '../../assets/HelpModalImgs/Message_bubble.svg';
import { ReactComponent as ReportsIcon } from '../../assets/HelpModalImgs/Analytics.svg';

const TOPICS = [
	{
		Icon: TeamIcon,
		label: 'Create Teams',
		title: 'Creating Teams',
		content:
			'Get started by creating teams! From 1 to 100, you can create unique team names, assign a manager, and monitor their recognition feeds! It’s as simple as selecting the team members, entering a team name and clicking a button! ',
	},
	{
		Icon: BadgeIcon,
		label: 'Use Badges',
		title: 'The badges',
		content:
			'Badges are easily accessible for you to add to any recognition! Simply create your message and add one of our stock badges to your message!',
	},
	{
		Icon: RecogIcon,
		label: 'Send Recognitions',
		title: 'Sending recognitions',
		content:
			'Send recognitions instantly! Simply click on a member’s name anywhere it appears or visit your workspace. Feel like having a little fun? Add one of our colorful stock badges for more impact!',
	},
	{
		Icon: ReportsIcon,
		label: 'View Analytics',
		title: 'Analytics',
		content:
			'As soon as your members are added and begin sending recognitions, a reports overview is available right from your dashboard! See recent activity results for the week, month and year in one easy glance, or visit reports for a larger more detailed view!',
	},
];

const HelpModalMenu = ({ setTitle, setContent }) => (
	<div className="modal-menu-container">
		{TOPICS.map(({ Icon, label, title, content }) => (
			<div
				key={label}
				role="button"
				tabIndex={0}
				className="modal-div"
				onClick={() => {
					setTitle(title);
					setContent(content);
				}}
			>
				<Icon />
				<h1>{label}</h1>
			</div>
		))}
	</div>
);

export default HelpModalMenu;
