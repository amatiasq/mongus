import { UserId, UserName } from './types';

export interface SerializedUser {
  id: UserId;
  name: UserName;
}

export function serializeUser({ id, name }: SerializedUser) {
  return { id, name };
}
