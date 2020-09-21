import { Action } from '../../shared/Action';
import { SerializedUser, serializeUser } from '../../shared/SerializedUser';
import { UserId } from '../../shared/types';
import { Socket } from './Socket';

export class User implements SerializedUser {
  //#region AFK
  private afkSince: number | null = null;
  actions = new Set<Action>();

  get isAfk() {
    return this.afkSince != null && Date.now() - this.afkSince > 1000;
  }

  afk() {
    this.afkSince = Date.now();
  }

  back() {
    this.afkSince = null;
  }
  //#endregion

  position = { x: rand(), y: rand() };

  constructor(readonly socket: Socket, readonly id: UserId) {}

  toJSON() {
    return serializeUser(this);
  }
}

function rand() {
  return Math.round(Math.random() * 500);
}
startGameLoop() {
  this.gameLoopId = gameloop.setGameLoop(this.step, 1000 / this.frameRate);
  this.logInterval = setInterval(this.logState, LOG_DELAY * 1000);

  console.info(`Server started at: ${new Date()}`);
}

stopGameLoop() {
  gameloop.clearGameLoop(this.gameLoopId);
  clearInterval(this.logInterval);

  console.info(`Server stoped at: ${new Date()}`);
}

stop() {
  gameloop.clearGameLoop(this.gameLoopId);
}