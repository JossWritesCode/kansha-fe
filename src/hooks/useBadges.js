import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBadges } from '../store/actions/badge-actions';

/* The shared badge list, fetched once per session, plus a lookup by id */
export const useBadges = () => {
	const dispatch = useDispatch();
	const badges = useSelector((state) => state.badges.list);

	useEffect(() => {
		dispatch(loadBadges());
	}, [dispatch]);

	const badgeById = useMemo(
		() => Object.fromEntries(badges.map((badge) => [badge.id, badge])),
		[badges],
	);

	return { badges, badgeById };
};
