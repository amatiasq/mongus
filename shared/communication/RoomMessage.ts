import { Vector } from './../Vector';

export enum RoomMessageType {
  POSITION_CHANGED = 'POSITION_CHANGED',
}

interface RoomMessage__POSITION_CHANGED {
  type: RoomMessageType.POSITION_CHANGED;
  position: Vector;
}

export type RoomMessage = RoomMessage__POSITION_CHANGED;
