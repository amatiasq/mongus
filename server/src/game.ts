import { Action } from '../../shared/Action';
import { User } from './User';

const SPEED = 100;

export function step(delta: number, users: User[]) {
  users.map(user => stepUser(delta, user));
}

function stepUser(delta: number, user: User) {
  if (user.actions.has(Action.UP)) user.position.y -= SPEED * delta;
  if (user.actions.has(Action.DOWN)) user.position.y += SPEED * delta;
  if (user.actions.has(Action.LEFT)) user.position.x -= SPEED * delta;
  if (user.actions.has(Action.RIGHT)) user.position.x += SPEED * delta;
}
