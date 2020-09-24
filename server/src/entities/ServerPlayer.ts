import { Action } from '../../../shared/Action';
import { EntityType } from '../../../shared/models/Entity';
import { Player } from '../../../shared/models/Player';
import { Orientation } from '../../../shared/Orientation';
import { getRandomColor } from '../getRandomColor';

const ALIVE_SPEED = 250;
const DEAD_SPEED = 500;

export class ServerPlayer implements Player {
  type = EntityType.Player as const;
  position = { x: rand(), y: rand() };
  orientation = Orientation.Left;
  color = getRandomColor();
  isDead = false;

  get speed() {
    return this.isDead ? DEAD_SPEED : ALIVE_SPEED;
  }

  private actions = new Set<Action>();

  setActions(actions: Action[]) {
    this.actions = new Set(actions);
  }

  isDoing(action: Action) {
    return this.actions.has(action);
  }

  done(action: Action) {
    this.actions.delete(action);
  }

  die() {
    this.isDead = true;
  }
}

function rand() {
  return Math.round(Math.random() * 500) - 250;
}
