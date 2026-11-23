import React from 'react';
import { Badge } from '../Profile/styled';

/* `userBadges` comes from countBadges() */
function Badges({ userBadges }) {
	return (
		<ul>
			{userBadges
				.filter((badge) => badge.badge)
				.map((badge) => (
					<Badge key={badge.id} count={badge.count}>
						<img
							className="badge-profile"
							src={badge.badge}
							alt="badge"
							width="140"
						/>
					</Badge>
				))}
		</ul>
	);
}

export default Badges;
