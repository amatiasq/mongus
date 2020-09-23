import { Action } from '../../../shared/Action';
import { Orientation } from '../../../shared/Orientation';
import { ServerPlayer } from '../entities/ServerPlayer';
import { Universe } from './Universe';

const SPEED = 200;

export function gameStep(delta: number, universe: Universe) {
  universe.forEachPlayer(player => stepPlayer(delta, player, universe));
}

function stepPlayer(delta: number, player: ServerPlayer, universe: Universe) {
  if (player.isDoing(Action.UP)) player.position.y -= SPEED * delta;
  if (player.isDoing(Action.DOWN)) player.position.y += SPEED * delta;

  if (player.isDoing(Action.LEFT)) {
    player.orientation = Orientation.Left;
    player.position.x -= SPEED * delta;
  }

  if (player.isDoing(Action.RIGHT)) {
    player.orientation = Orientation.Right;
    player.position.x += SPEED * delta;
  }

  if (!player.isDead && player.isDoing(Action.KILL)) {
    const victim = universe.getClosestAlive(player, 100);

    if (victim) {
      universe.kill(player, victim);
      player.done(Action.KILL);
    }
  }
}
