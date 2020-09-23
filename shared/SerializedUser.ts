import { Vector } from './Vector';
import { UserId } from './types';

export interface SerializedUser {
  id: UserId;
  position: Vector;
  color: string;
  isDead: boolean;
}

export function serializeUser({ id, position, color, isDead }: SerializedUser) {
  return { id, position, color, isDead };
}
