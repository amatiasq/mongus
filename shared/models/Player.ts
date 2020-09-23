import {
  createEntity,
  deserializeEntity,
  Entity,
  EntityType,
  serializeEntity,
} from './Entity';

export interface Player extends Entity {
  type: EntityType.Player;
  isDead: boolean;
}

export function createPlayer() {
  return {
    ...createEntity(),
    type: EntityType.Player as const,
    isDead: false,
  };
}

export function serializePlayer(player: Player): Player {
  const { isDead } = player;

  return {
    ...serializeEntity(player),
    type: EntityType.Player as const,
    isDead,
  };
}

export function deserializePlayer<T extends Player>(
  target: T,
  player: Player,
): T {
  deserializeEntity(target, player);
  target.type = EntityType.Player;
  target.isDead = player.isDead;
  return target;
}
