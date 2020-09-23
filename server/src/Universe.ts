import { DeadBody } from './../../shared/DeadBody';
import { getDistance } from './../../shared/Vector';
import { User } from './User';

export class Universe {
  users: User[] = [];
  entities: DeadBody[] = [];

  getAllNeighbors(self: User) {
    return this.users.filter(x => x !== self);
  }

  getClosestNeighbor(self: User, maxRadius: number) {
    const others = this.getAllNeighbors(self);

    let closer: User | null = null;
    let closerDistance: number = Infinity;

    for (const neighbor of others) {
      const distance = getDistance(self.position, neighbor.position);

      if (distance < closerDistance) {
        closerDistance = distance;
        closer = neighbor;
      }
    }

    return closerDistance < maxRadius ** 2 ? closer : null;
  }

  kill(murderer: User, victim: User) {
    victim.die();
    this.entities.push({
      color: victim.color,
      position: { ...victim.position },
    });
  }

  toJSON() {
    const { users, entities } = this;
    return { users, entities };
  }
}
