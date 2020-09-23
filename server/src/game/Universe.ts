import { serializePlayer } from './../../../shared/models/Player';
import {
  bodyFromPlayer,
  DeadBody,
  serializeDeadBody,
} from './../../../shared/models/DeadBody';
import { EntityList } from './EntityList';
import { ServerPlayer } from '../entities/ServerPlayer';

export class Universe {
  private players = new EntityList<ServerPlayer>();
  private bodies = new EntityList<DeadBody>();

  setPlayers(players: ServerPlayer[]) {
    this.players.clear();
    players.forEach(x => this.players.add(x));
  }

  forEachPlayer(iterator: (player: ServerPlayer) => void) {
    this.players.forEach(iterator);
  }

  getClosestAlive(self: ServerPlayer, maxDistance: number) {
    return this.players.getClosestTo(self.position, maxDistance, self);
  }

  kill(murderer: ServerPlayer, victim: ServerPlayer) {
    victim.die();
    this.bodies.add(bodyFromPlayer(victim));
  }

  toJSON() {
    return [
      ...this.players.toArray().map(serializePlayer),
      ...this.bodies.toArray().map(serializeDeadBody),
    ];
  }
}
