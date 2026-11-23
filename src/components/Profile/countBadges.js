/*
	Groups the badges a user has received into { id, badge, count } entries.
	`recs` is the user's recognitions (sent and received); `userId` is used
	to skip the ones they sent.
*/
export const countBadges = (recs, userId, badges) => {
	if (!recs) return [];
	const counts = new Map();
	for (const rec of recs) {
		if (rec.sender === userId || rec.badge_id == null) continue;
		const entry = counts.get(rec.badge_id);
		if (entry) {
			entry.count++;
		} else {
			const badge = badges.find((bdg) => bdg.id === rec.badge_id);
			counts.set(rec.badge_id, {
				id: rec.badge_id,
				badge: badge?.badge_URL,
				count: 1,
			});
		}
	}
	return [...counts.values()];
};
