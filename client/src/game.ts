import { Vector } from '../../shared/Vector';
import { render } from './canvas';
import { isPressed, Action } from './interaction';
import { User } from './User';
import { getUserList } from './users';

const SPEED = 5;

export function runFrame(user: User) {
  movePlayer(user.position);
  const others = getUserList().map(x => x.position);
  render(user.position, others);
}

function movePlayer(position: Vector) {
  if (isPressed(Action.UP)) position.y -= SPEED;
  if (isPressed(Action.DOWN)) position.y += SPEED;
  if (isPressed(Action.LEFT)) position.x -= SPEED;
  if (isPressed(Action.RIGHT)) position.x += SPEED;
}
