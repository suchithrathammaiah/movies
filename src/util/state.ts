import { SearchRequest } from "../services/movie";

export const getSavedQuery = (): SearchRequest => {
  return parseQueryString(window.localStorage.getItem('query') || '');
}

export const parseQueryString = (query: string): SearchRequest => {
  const x = query.split('&') || '';
  const s = x[0].split('=')[1] || '';
  const type = x[1]? x[1].split('=')[1] || '' : '';
  const year = x[2]? x[2].split('=')[1] || '' :'';
  const page = x[3]? Number(x[3].split('=')[1]) || 1 : 1;
  return {
    s, type, year, page, query
  }
}

export const generateQueryUrl = (req: SearchRequest): string => {
  return `s=${req.s}&type=${req.type}&y=${req.year}&page=${req.page}`;
}
