import { getDistance, Vector } from '../../../shared/Vector';
import { Entity } from './../../../shared/models/Entity';

export class EntityList<T extends Entity = Entity> {
  private internal = new Set<T>();

  add(entity: T) {
    this.internal.add(entity);
  }

  remove(entity: T) {
    this.internal.delete(entity);
  }

  clear() {
    this.internal.clear();
  }

  forEach(iterator: (item: T) => void) {
    this.internal.forEach(iterator);
  }

  getWithin(point: Vector, maxDistance: number, exclude?: T | null) {
    const maxDistanceSq = maxDistance * maxDistance;
    const result: T[] = [];

    this.internal.forEach(entity => {
      if (exclude === entity) return;

      const distance = getDistance(point, entity.position);

      if (distance <= maxDistanceSq) {
        result.push(entity);
      }
    });

    return result;
  }

  getClosestTo(point: Vector, maxDistance: number, exclude?: T | null) {
    const maxDistanceSq = maxDistance * maxDistance;
    let closer: T | null = null;
    let closerDistance: number = Infinity;

    this.internal.forEach(entity => {
      if (exclude === entity) return;

      const distance = getDistance(point, entity.position);

      if (distance < closerDistance) {
        closerDistance = distance;
        closer = entity;
      }
    });

    return closerDistance < maxDistanceSq ? closer! : null;
  }

  toArray() {
    return Array.from(this.internal);
  }
}
