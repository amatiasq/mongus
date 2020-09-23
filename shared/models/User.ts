import { UserId } from '../types';
import {
  createPlayer,
  deserializePlayer,
  Player,
  serializePlayer,
} from './Player';

export interface User {
  id: UserId;
  player: Player;
}

export function serializeUser(model: User) {
  return { id: model.id, player: serializePlayer(model.player) };
}

export function deserializeUser<T extends User>(target: T, model: User) {
  target.id = model.id;

  target.player = deserializePlayer(
    target.player || createPlayer(),
    model.player,
  );

  return target;
}
