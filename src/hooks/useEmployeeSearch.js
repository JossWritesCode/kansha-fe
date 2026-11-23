import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDebouncedValue } from './useDebouncedValue';

/*
	Searches the current user's organization, a page at a time.
	- The search is debounced and URL-encoded.
	- Responses for an outdated search or page are ignored, so fast typing
	  can't show results out of order.
	- `count` is the organization's total. The API doesn't count search
	  matches, so `hasMore` is based on whether the last page was full.
*/
export const useEmployeeSearch = (
	search,
	{ limit = 20, enabled = true } = {},
) => {
	const query = useDebouncedValue(search.trim());
	const [paging, setPaging] = useState({ query, page: 1 });
	const page = paging.query === query ? paging.page : 1;

	const [employees, setEmployees] = useState([]);
	const [count, setCount] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!enabled) return;
		let cancelled = false;
		const params = new URLSearchParams({
			search: query,
			limit,
			page,
			sortby: 'first_name',
		});

		setIsLoading(true);
		setError(null);
		axiosWithAuth()
			.get(`/employees/organizations?${params}`)
			.then(({ data }) => {
				if (cancelled) return;
				const results = data.employees || [];
				setEmployees((prev) =>
					page === 1 ? results : [...prev, ...results],
				);
				setCount(data.count || 0);
				setHasMore(results.length === limit);
			})
			.catch((err) => {
				if (!cancelled) setError(err);
			})
			.finally(() => {
				if (!cancelled) setIsLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [query, page, limit, enabled]);

	const loadMore = () => setPaging({ query, page: page + 1 });

	return {
		employees,
		setEmployees,
		count,
		hasMore,
		loadMore,
		isLoading,
		error,
	};
};
