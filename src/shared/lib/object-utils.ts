type NotNull<T> = T extends undefined | null ? never : T;

type TObject<V> = Record<string | number | symbol, V>;

export function removeEmptyProperties<T extends TObject<unknown>>(
  obj: T
): TObject<NotNull<unknown>> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => Boolean(v)));
}
