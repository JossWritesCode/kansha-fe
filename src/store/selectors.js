/*
	Select only what a component needs. Returning a fresh object from
	useSelector (e.g. `({ user }) => ({ ...user })`) re-renders the component
	on every store update.
*/
export const selectProfile = (state) => state.user.profile;

export const isAdminProfile = (profile) =>
	(profile?.user_type || '').toLowerCase() === 'admin';

export const selectIsAdmin = (state) => isAdminProfile(state.user.profile);

export const selectFeed = (state) => state.liveFeed.feed;
export const selectComments = (recId) => (state) =>
	state.liveFeed.comments[recId];
export const selectReactions = (recId) => (state) =>
	state.liveFeed.reactions[recId];
