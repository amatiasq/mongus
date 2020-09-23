import {
  deserializeEntity,
  Entity,
  EntityType,
  serializeEntity,
} from './Entity';
import { Player } from './Player';

export interface DeadBody extends Entity {
  type: EntityType.DeadBody;
}

export function serializeDeadBody(body: DeadBody) {
  return {
    ...serializeEntity(body),
    type: EntityType.DeadBody,
  };
}

export function deserializeDeadBody<T extends DeadBody>(
  target: T,
  body: DeadBody,
) {
  deserializeEntity(target, body);
  target.type = EntityType.DeadBody;
  return target;
}

export function bodyFromPlayer({
  color,
  orientation,
  position,
}: Player): DeadBody {
  return {
    type: EntityType.DeadBody,
    color,
    orientation,
    position: { ...position },
  };
}
