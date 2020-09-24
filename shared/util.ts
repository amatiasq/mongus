const _: any = 0;

export function chain<T>(init: T, ...fns: ((x: T) => T)[]) {
  let value = init;
  fns.forEach(x => (value = x(value)));
  return value;
}

export function compressList<T>(
  compare: (a: T, b: T) => boolean,
  cache: T[],
  data: T[],
) {
  if (cache.length !== data.length) {
    return data;
  }

  const compressed = data.map((x, i) => (compare(x, cache[i]) ? _ : x));
  return compressed.every(x => x === _) ? (undefined as any) : compressed;
}

export function decompressList<T>(list: T[], cache?: T[]) {
  if (!cache) {
    return list;
  }

  if (list === undefined) {
    return cache;
  }

  const omitted = (_ as any) as T;
  return list.map((x, i) => (x === omitted ? cache[i] : x));
}
