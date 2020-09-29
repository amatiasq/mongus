import { Entity } from '../../shared/models/Entity';
import { Obstacle } from '../../shared/models/Obstacle';
import { User } from '../../shared/models/User';
import { UserId } from '../../shared/types';
import { ClientUser } from './ClientUser';

export class GameState {
  readonly uuid = `${Math.random()}${Date.now()}` as UserId;

  me: ClientUser | undefined;
  users: ClientUser[] = [];
  entities: Entity[] = [];
  obstacles: Obstacle[] = [];

  get players() {
    return this.users.map(x => x.player);
  }

  setObstacles(obstacles: Obstacle[]) {
    this.obstacles = obstacles;
  }

  setEntities(entities: Entity[]) {
    this.entities = entities;
  }

  setUsers(users: User[]) {
    this.users = this.getUsersFromServer(users, this.uuid);
    this.me = this.users.find(x => x.isPlayer);
  }

  addUser(user: ClientUser) {
    this.users.push(user);
    this.onUserListChanged();
  }

  removeUser(uuid: UserId) {
    const index = this.users.findIndex(x => x.id === uuid);

    if (index !== -1) {
      this.users.splice(index, 1);
      this.onUserListChanged();
    }
  }

  private getUsersFromServer(list: User[], uuid: UserId) {
    return list.map(x => new ClientUser(x, x.id === uuid));
  }

  private onUserListChanged() {
    console.log('users', this.users);
  }
}
