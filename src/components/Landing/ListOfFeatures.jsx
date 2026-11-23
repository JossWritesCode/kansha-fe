import React from 'react';
import {
	FiGift,
	FiUsers,
	FiSettings,
	FiAward,
	FiHeart,
	FiMessageCircle,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const features = [
	{
		Icon: FiGift,
		title: 'Rewards',
		description:
			'Send your peers a gift card with a message to show recognition.',
	},
	{
		Icon: FiAward,
		title: 'Earn badges',
		description:
			'Earn and send badges to your peers that represent their hard work.',
	},
	{
		Icon: FiUsers,
		title: 'Workspace',
		description:
			'Connect people in the same workspace with public recognition.',
	},
	{
		Icon: FiHeart,
		title: (
			<>
				Leave a{' '}
				<FaHeart className="lp-feature__heart" aria-label="heart" />
			</>
		),
		description:
			'React to posts with your favorite emoji to show your appreciation.',
	},
	{
		Icon: FiSettings,
		title: 'Admin access',
		description:
			'Only admin users have access to certain features to ensure moderation.',
	},
	{
		Icon: FiMessageCircle,
		title: 'Activity',
		description:
			'Keep track of your recognitions with our profile activities tracker.',
	},
];

export default function ListOfFeatures() {
	return (
		<section className="lp-section lp-features">
			<div className="lp-container">
				<h2 className="lp-heading lp-heading--xl">
					Recognize, motivate, and track accomplishments.
				</h2>
				<ul className="lp-features__grid">
					{features.map(({ Icon, title, description }, i) => (
						<li className="lp-feature" key={i}>
							<span className="lp-feature__icon" aria-hidden="true">
								<Icon />
							</span>
							<div>
								<h3 className="lp-feature__title">{title}</h3>
								<p className="lp-feature__body">{description}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
