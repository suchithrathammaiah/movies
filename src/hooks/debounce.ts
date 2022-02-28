import { useState } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import { SearchRequest } from '../services/movie';

export const useDebouncedSearch = (initialState: SearchRequest, searchFunction: any) => {
  const [query, setQuery] = useState<SearchRequest>({
    s: initialState.s,
    type: initialState.type,
    year: initialState.year,
    page: initialState.page,
    query: initialState.query
  });

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 200)
  );

  const searchResult = useAsync(
    async () => {
      if (query.s.length === 0) {
        return [];
      } else {
        return debouncedSearchFunction(query);
      }
    },
    [debouncedSearchFunction, query]
  );

  return {
    query,
    setQuery,
    searchResult,
  };
};