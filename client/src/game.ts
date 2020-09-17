import { Vector } from '../../shared/Vector';
import { render } from './canvas';
import { Action, keyboard } from './interaction';
import { User } from './User';
import { getUserList } from './users';

const SPEED = 5;

export function runFrame(user: User) {
  movePlayer(user.position);
  const others = getUserList().map(x => x.position);
  render(user.position, others);
}

function movePlayer(position: Vector) {
  if (keyboard.isActive(Action.UP)) position.y -= SPEED;
  if (keyboard.isActive(Action.DOWN)) position.y += SPEED;
  if (keyboard.isActive(Action.LEFT)) position.x -= SPEED;
  if (keyboard.isActive(Action.RIGHT)) position.x += SPEED;
}
