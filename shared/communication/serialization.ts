export type Serializer<T> = (model: T) => T;
export type Deserializer<T> = <U extends T>(target: U, model: T) => U;
