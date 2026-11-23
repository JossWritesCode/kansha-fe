import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useDebouncedValue } from './useDebouncedValue';

// Adds a page of results, skipping anyone already listed
const appendPage = (employees, page) => {
	const listed = new Set(employees.map((emp) => emp.id));
	return [...employees, ...page.filter((emp) => !listed.has(emp.id))];
};

/*
	Searches the current user's organization, a page at a time.
	- The search is debounced and URL-encoded.
	- A new search always starts again from page 1.
	- "Show more" asks for the page after the last one that loaded, so a
	  failed page is retried rather than skipped.
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

	// The page being requested, and the last page that loaded, for `query`
	const [request, setRequest] = useState({ query, page: 1 });
	const [loadedPage, setLoadedPage] = useState(0);

	const [employees, setEmployees] = useState([]);
	const [count, setCount] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// A new search resets paging before anything is fetched for it
	if (request.query !== query) {
		setRequest({ query, page: 1 });
		setLoadedPage(0);
		setHasMore(false);
	}

	useEffect(() => {
		if (!enabled) return;
		let cancelled = false;
		const { page } = request;
		const params = new URLSearchParams({
			search: request.query,
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
					page === 1 ? results : appendPage(prev, results),
				);
				setLoadedPage(page);
				setCount(data.count || 0);
				setHasMore(results.length === limit);
			})
			.catch((err) => {
				if (cancelled) return;
				setError(err);
				// Don't leave the previous search's results on screen
				if (page === 1) setEmployees([]);
			})
			.finally(() => {
				if (!cancelled) setIsLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [request, limit, enabled]);

	const loadMore = () => setRequest({ query, page: loadedPage + 1 });

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
