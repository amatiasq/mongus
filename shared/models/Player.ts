import { UserName } from './../types';
import {
  createEntity,
  deserializeEntity,
  Entity,
  EntityType,
  serializeEntity,
} from './Entity';

export interface Player extends Entity {
  type: EntityType.Player;
  name: UserName;
  isDead: boolean;
  speed: number;
}

export function createPlayer() {
  return {
    ...createEntity(),
    type: EntityType.Player as const,
    isDead: false,
  };
}

export function serializePlayer(player: Player): Player {
  return {
    ...serializeEntity(player),
    type: EntityType.Player as const,
    name: player.name,
    isDead: player.isDead,
    speed: player.speed,
  };
}

export function deserializePlayer<T extends Player>(
  target: T,
  player: Player,
): T {
  deserializeEntity(target, player);
  target.type = EntityType.Player;
  target.name = player.name;
  target.isDead = player.isDead;
  target.speed = player.speed;
  return target;
}
