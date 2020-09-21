import { Vector } from './Vector';
import { UserId, UserName } from './types';

export interface SerializedUser {
  id: UserId;
  // name: UserName;
  position: Vector;
}

export function serializeUser({ id, position }: SerializedUser) {
  return { id, position };
}
