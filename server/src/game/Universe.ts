import {
  bodyFromPlayer,
  DeadBody,
  serializeDeadBody,
} from '../../../shared/models/DeadBody';
import { ServerPlayer } from '../entities/ServerPlayer';
import { EntityList } from './EntityList';

export class Universe {
  private alive = new EntityList<ServerPlayer>();
  private dead = new EntityList<ServerPlayer>();
  private bodies = new EntityList<DeadBody>();

  setPlayers(players: ServerPlayer[]) {
    this.alive.clear();
    this.dead.clear();

    players.forEach(x => (x.isDead ? this.dead.add(x) : this.alive.add(x)));
  }

  forEachPlayer(iterator: (player: ServerPlayer) => void) {
    this.alive.forEach(iterator);
    this.dead.forEach(iterator);
  }

  getClosestAlive(self: ServerPlayer, maxDistance: number) {
    return this.alive.getClosestTo(self.position, maxDistance, self);
  }

  kill(murderer: ServerPlayer, victim: ServerPlayer) {
    victim.die();
    this.bodies.add(bodyFromPlayer(victim));
  }

  toJSON() {
    return [
      // ...this.alive.toArray().map(serializePlayer),
      // ...this.dead.toArray().map(serializePlayer),
      ...this.bodies.toArray().map(serializeDeadBody),
    ];
  }
}
