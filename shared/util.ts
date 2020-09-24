const _: any = 0;

type F<T1, T2> = (x: T1) => T2;

export function chain<
  T1,
  T2 extends ReturnType<FN[0]>,
  T3 extends ReturnType<FN[1]>,
  T4 extends ReturnType<FN[2]>,
  T5 extends ReturnType<FN[3]>,
  T6 extends ReturnType<FN[4]>,
  T7 extends ReturnType<FN[5]>,
  T8 extends ReturnType<FN[6]>,
  FN extends Array<F<any, any>>,
  // prettier-ignore
  R extends FN extends [] ? T1
    : FN extends [F<T1, T2>] ? T2
    : FN extends [F<T1, T2>, F<T2, T3>] ? T3
    : FN extends [F<T1, T2>, F<T2, T3>, F<T3, T4>] ? T4
    : FN extends [F<T1, T2>, F<T2, T3>, F<T3, T4>, F<T4, T5>] ? T5
    : FN extends [F<T1, T2>, F<T2, T3>, F<T3, T4>, F<T4, T5>, F<T5, T6>] ? T6
    : FN extends [F<T1, T2>, F<T2, T3>, F<T3, T4>, F<T4, T5>, F<T5, T6>, F<T6, T7>] ? T7
    : FN extends [F<T1, T2>, F<T2, T3>, F<T3, T4>, F<T4, T5>, F<T5, T6>, F<T6, T7>, F<T7, T8>] ? T8
    : any
>(init: T1, ...fns: FN) {
  return fns.reduce((value, x) => x(value), init) as R;
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
