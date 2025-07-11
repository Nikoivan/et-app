import { useEffect, useState } from 'react';

type Params = { url: string; dependencies?: unknown[] };

export const useFetchRequest = <T>({ url, dependencies }: Params) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (response.status >= 300) {
          setError('Ошибка запроса');
        }

        setData((await response.json()) as T);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        setError(`Ошибка запроса ${JSON.stringify(url)}`);
      }

      setIsLoading(false);
    })();
  }, [url, dependencies]);

  return { data, error, isLoading };
};
