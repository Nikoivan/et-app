type TObject = Record<string | number | symbol, unknown>;

export function removeEmptyProperties<T extends TObject>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => Boolean(v))
  ) as T;
}
