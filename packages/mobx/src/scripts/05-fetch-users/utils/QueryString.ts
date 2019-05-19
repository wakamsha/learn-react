import { Location as HLocation } from 'history';

type QueryHash = { [key: string]: string | number };

export function stringify(query: QueryHash): string {
  const params = Object.keys(query).map(key => {
    const value = query[key];
    if (!value) {
      return;
    }
    return `${key}=${encodeURIComponent(`${value}`)}`;
  });
  return params.join('&');
}

export function parse(location: HLocation | Location) {
  const search = location.search;
  const queries = search.slice(1).split('&');
  const queryHash = queries.reduce(
    (hash, query) => {
      const [key, value] = query.split('=');
      hash[key] = value;
      return hash;
    },
    {} as QueryHash,
  );
  return queryHash;
}
