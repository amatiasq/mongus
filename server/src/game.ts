import { Universe } from './Universe';
import { Action } from '../../shared/Action';
import { User } from './User';

const SPEED = 100;

export function step(delta: number, universe: Universe) {
  universe.users.map(user => stepUser(delta, user, universe));
}

function stepUser(delta: number, user: User, universe: Universe) {
  if (user.actions.has(Action.UP)) user.position.y -= SPEED * delta;
  if (user.actions.has(Action.DOWN)) user.position.y += SPEED * delta;
  if (user.actions.has(Action.LEFT)) user.position.x -= SPEED * delta;
  if (user.actions.has(Action.RIGHT)) user.position.x += SPEED * delta;

  if (user.actions.has(Action.KILL)) {
    const victim = universe.getClosestNeighbor(user, 100);

    if (victim) {
      universe.kill(user, victim);
    }
  }
}
