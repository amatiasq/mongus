import { Action } from '../../../shared/Action';
import { Orientation } from '../../../shared/Orientation';
import { chain } from '../../../shared/util';
import { multiply, plus } from '../../../shared/Vector';
import { ServerPlayer } from '../entities/ServerPlayer';
import { Universe } from './Universe';

const vector45Deg = Math.sin(Math.PI / 4);

export function gameStep(delta: number, universe: Universe) {
  universe.forEachPlayer(player => stepPlayer(delta, player, universe));
}

function stepPlayer(delta: number, player: ServerPlayer, universe: Universe) {
  const direction = calculatePlayerDirection(player);

  if (direction.x || direction.y) {
    player.position = chain(
      direction,
      multiply(player.speed * delta),
      plus(player.position),
    );
  }

  if (player.isDead) {
    if (player.isDoing(Action.RESURRECT)) {
      player.isDead = false;
      player.done(Action.RESURRECT);
    }
    return;
  }

  if (player.isDoing(Action.KILL)) {
    const victim = universe.getClosestAlive(player, 100);

    if (victim) {
      universe.kill(player, victim);
      player.done(Action.KILL);
    }
  }

  if (player.isDoing(Action.COMMIT_SUICIDE)) {
    universe.kill(player, player);
    player.done(Action.COMMIT_SUICIDE);
  }
}

function calculatePlayerDirection(player: ServerPlayer) {
  const direction = { x: 0, y: 0 };

  if (player.isDoing(Action.UP)) direction.y -= 1;
  if (player.isDoing(Action.DOWN)) direction.y += 1;

  if (player.isDoing(Action.LEFT)) {
    player.orientation = Orientation.Left;
    direction.x -= 1;
  }

  if (player.isDoing(Action.RIGHT)) {
    player.orientation = Orientation.Right;
    direction.x += 1;
  }

  if (direction.x && direction.y) {
    direction.x = vector45Deg * direction.x;
    direction.y = vector45Deg * direction.y;
  }

  return direction;
}
