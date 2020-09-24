export function chain<T>(init: T, ...fns: ((x: T) => T)[]) {
  let value = init;
  fns.forEach(x => (value = x(value)));
  return value;
}
