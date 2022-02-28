import Constants from "../constants/constants";

export interface SearchRequest {
  s: string;
  type: string;
  year: string;
  page: number;
  query: string;
}

export const searchMovies = async (request: SearchRequest) => {
  try {
    const url = Constants.OMBD_API_PREFIX + request.query + `&i=tt3896198&apikey=${Constants.OMBD_API_KEY}`;
    const res: any = await fetch(url).catch(err => console.log(err));
    const data = await res.json();

    if (data.Response === "True") {
      const ids: string[] = [];
      for (const movie of data.Search) {
        ids.push(movie.imdbID);
      }
      console.log(ids)
      return ids;
    }
    else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
  }
}

export const getMovieById = async (id: string, query: string) => {
  try {
    const res: any = await fetch(`${Constants.OMBD_API_PREFIX}i=${id}&apikey=${Constants.OMBD_API_KEY}`)
      .catch(err => console.log(err));
    const movie = await res.json();
    return {
      id,
      query,
      disabled: false,
      actors: movie.Actors,
      boxOffice: movie.BoxOffice,
      country: movie.Country,
      director: movie.Director,
      genre: movie.Genre,
      language: movie.Language,
      metaScore: movie.Metascore,
      plot: movie.Plot,
      poster: movie.Poster,
      production: movie.Production,
      rated: movie.Rated,
      ratings: movie.Ratings,
      release: movie.Released,
      runtime: movie.Runtime,
      title: movie.Title,
      imdbRating: movie.imdbRating,
      imdbVotes: movie.imdbVotes,
      year: movie.Year
    }
  } catch (error) {
    console.log('error', error);

  }
}
