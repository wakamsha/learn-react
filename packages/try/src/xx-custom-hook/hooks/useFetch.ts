import { useEffect, useReducer } from 'react';

type State = {
  loading: boolean;
  data?: any;
  error?: Error;
};

type Action = {
  type: 'init' | 'start' | 'data' | 'error';
  data?: any;
  error?: Error;
};

const initialState = {
  loading: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'start':
      return { ...state, loading: true };
    case 'data':
      return { ...state, loading: false, data: action.data };
    case 'error':
      return { ...state, loading: false, error: action.error };
    default:
      throw new Error('no such action type');
  }
};

export const useFetch = (url: string, opts: any, readBody: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let dispatchSafe = (action: Action) => dispatch(action);
    const abortController = new AbortController();

    (async () => {
      if (!url) return;
      dispatchSafe({ type: 'start' });
      try {
        const response = await fetch(url, {
          ...opts,
          signal: abortController.signal,
        });
        if (response.ok) {
          const body = await readBody(response);
          dispatchSafe({ type: 'data', data: body });
        } else {
          const e = new Error(`Fetch failed: ${response.statusText}`);
          dispatchSafe({ type: 'error', error: e });
        }
      } catch (e) {
        if (e instanceof Error) {
          dispatchSafe({ type: 'error', error: e });
        }
      }
    })();

    return () => {
      dispatchSafe = () => null;
      abortController.abort();
      dispatch({ type: 'init' });
    };
  }, [url, opts, readBody]);

  return state;
};
