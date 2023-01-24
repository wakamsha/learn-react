import { useCallback, useState, useTransition } from 'react';

export function usePageNumberV1() {
  const [page, setPage] = useState(1);

  const incrementPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const decrementPage = useCallback(() => {
    setPage((p) => Math.max(p + 1, 1));
  }, []);

  return {
    page,
    incrementPage,
    decrementPage,
  };
}

export function usePageNumberV2() {
  const [page, setPage] = useState(1);

  const [isPending, startTransition] = useTransition();

  const incrementPage = useCallback(() => {
    startTransition(() => {
      setPage((p) => p + 1);
    });
  }, []);

  const decrementPage = useCallback(() => {
    startTransition(() => {
      setPage((p) => Math.max(p - 1, 1));
    });
  }, []);

  return {
    page,
    isPending,
    incrementPage,
    decrementPage,
  };
}
