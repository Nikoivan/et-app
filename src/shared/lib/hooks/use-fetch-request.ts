import { Either } from '@/shared/lib/either';
import { useEffect, useState } from 'react';

type Callback<T> = (data?: unknown) => Promise<Either<string, T>>;

type Source<T> = string | Callback<T>;

type Params<T> = { source: Source<T>; dependencies?: unknown[] };

export const useFetchRequest = <T>({ source, dependencies }: Params<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const takeRequest = async (url: string) => {
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
      setError(`Ошибка запроса ${JSON.stringify(source)}`);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (typeof source === 'string') {
        await takeRequest(source);
      } else {
        const either = await source();

        if (either.type === 'left') {
          setError(either.error);
        } else {
          setData(either.value);
        }
      }

      setIsLoading(false);
    })();
  }, [source, dependencies]);

  return { data, error, isLoading };
};
