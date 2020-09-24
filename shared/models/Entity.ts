import { Orientation } from '../Orientation';
import { HexColor } from '../types';
import { serializeVector, Vector } from '../Vector';

export enum EntityType {
  Unknown,
  Player,
  DeadBody,
}

export interface Entity {
  type: EntityType;
  color: HexColor;
  position: Vector;
  orientation: Orientation;
}

export function createEntity() {
  return {
    type: EntityType.Unknown,
    color: '#FFFFFF',
    position: { x: 0, y: 0 },
    orientation: Orientation.Left,
  };
}

export function serializeEntity({
  type,
  color,
  position,
  orientation,
}: Entity) {
  return { type, color, position: serializeVector(position), orientation };
}

export function deserializeEntity<T extends Entity>(
  target: T,
  { type, color, position, orientation }: Entity,
) {
  target.type = type;
  target.color = color;
  target.position = position;
  target.orientation = orientation;
  return target;
}
