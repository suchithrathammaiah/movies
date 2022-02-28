import { useEffect, useState } from 'react';
import List from './components/List';
import SearchBar from './components/SearchBar';
import Snackbar from '@material-ui/core/Snackbar';
import Constants from './constants/constants';
import { useDebouncedSearch } from './hooks/debounce';
import { SearchRequest, getMovieById, searchMovies } from './services/movie';
import { Movie } from './models/movie';
import { generateQueryUrl, getSavedQuery } from './util/state';

import './styles/App.css';
import './styles/Loader.css';

//debounce hook
const useSearchMovies = (initialState: SearchRequest) => useDebouncedSearch(initialState, ((query: SearchRequest) => searchMovies(query)));

export default function App() {
	const initialQuery = getSavedQuery();

	const { query, setQuery, searchResult } = useSearchMovies(initialQuery);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [moviesLoading, setMoviesLoading] = useState(true); // Render loaders while data is being fetched

	useEffect(() => {

		async function fetchMovies(ids: string[], queries: string[]) {
			const fullMovies: Movie[] = [];
			for (var i = 0; i < ids.length; i++) { // Loop over the ID's
				const id = ids[i];
				const s = queries.length > 0 ? queries[i] : query.s;
				const fullMovie = await getMovieById(id, s);
				if (fullMovie) {
					fullMovies.push(fullMovie);
				}
			}
			setMovies(fullMovies);
			setMoviesLoading(false);
		}

		// Set movies from search result
		if (!searchResult.loading) {
			if (query.s !== '') {
				fetchMovies(searchResult.result, []);
			} else {
				setMovies([]);
				setMoviesLoading(false);
			}
		}

		if (query.s === '') {
			setMovies([]);
		}
	},
		[searchResult.loading,
		searchResult.result,
		query.s
		]);

	/*** Handle user search input. */
	const handleQuery = async (e: any) => {
		setMoviesLoading(true);
		const newQuery = { ...query, s: e.target.value };
		const url = generateQueryUrl(newQuery);
		window.localStorage.setItem('query', url);
		setQuery({ ...newQuery, query: url });
	}

	return (
		<div className="App">
			<h2 className="title">Movies</h2>
			<SearchBar query={query.s} handleQuery={handleQuery} />
			<div className="vertical-spacer" />
			<div className="lists">
				{/* Movie List */}
				<div className="list-container">
					<h3 className="subtitle">{query.s === '' ? 'Results' : `Results for "${query.s}"`}</h3>
					{moviesLoading === false ? (
						<List
							query={query.s}
							movies={movies}
							onSelect={movies}
						/>
					) : (
						<div className='loader-container'>
							<div className='loader' />
						</div>
					)}
				</div>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				message={Constants.RESULTS_EMPTY_MESSAGE}
				key={'bottom-right'}
			/>
		</div>
	);
}

