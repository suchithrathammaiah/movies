import { useState } from 'react';
import { Flipper } from 'react-flip-toolkit';
import { MovieCard, ExpandedMovieCard } from './MovieCard'
import { Movie } from '../models/movie';
import Constants from '../constants/constants';
import '../styles/App.css';

export default function List({ movies, onSelect, query }
	: { movies: Movie[], onSelect: any, query: string }) {

	const [openCard, setOpenCard] = useState<string>('');

	const handleSelect = (e: React.MouseEvent<HTMLElement>, movie: Movie) => {
		if (openCard !== '' && openCard === movie.id) {
			setOpenCard('');
		}
		onSelect(movie);
		e.stopPropagation();
	}

	const onClick = (id: string) => {
		if (openCard === id) {
			setOpenCard('');
		} else {
			setOpenCard(id);
		}
	}

	if (movies && movies.length > 0) {
		return (
			<Flipper
				flipKey={openCard}
				spring="veryGentle"
				staggerConfig={{
					card: {
						reverse: openCard !== ''
					}
				}}
				decisionData={openCard}
			>
				<ul className="list">
					{movies.map(movie => {
						return (
							<li key={movie.id}>
								{openCard === movie.id ? (
									<ExpandedMovieCard
										movie={movie}
										onSelect={handleSelect}
										onClick={onClick}
									/>
								) : (
									<MovieCard
										movie={movie}
										onSelect={handleSelect}
										onClick={onClick}
									/>
								)
								}
							</li>
						);
					})
					}
				</ul>
			</Flipper>
		)
	} else {
		return (
			<div>{Constants.NO_SEARCH_PROVIDED}</div>
		)
	}
}