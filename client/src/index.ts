import { ResilientSocket } from '@amatiasq/resilient-socket';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { DeadBody } from '../../shared/models/DeadBody';
import { ClientUser } from './entities/ClientUser';
import { GameEngine, Hook } from './GameEngine';
import { GameState } from './GameState';
import { compress, decompress, deserialize, serialize } from './processors';
import { getUserName, watchKeyboard } from './ui/interactions';
import { Renderer } from './ui/Renderer';

let FORCE_PROD_SERVER = false;
// FORCE_PROD_SERVER = true;

const serverUri =
  location.origin === 'https://amatiasq.github.io' || FORCE_PROD_SERVER
    ? 'wss://amongus.amatiasq.com'
    : 'ws://localhost:17965';

const state = new GameState();
const renderer = new Renderer(document.querySelector('canvas')!);
const engine = new GameEngine();
const socket = new ResilientSocket(serverUri);

// RENDERING

renderer.fillPage();
// renderer.fullscreen();

// INPUT

watchKeyboard(actions =>
  engine.send(ClientMessageType.USER_ACTIONS, { actions: Array.from(actions) }),
);

// SOCKET COMMUNICATION

engine
  .pipeline<ClientMessage>(Hook.SEND_MESSAGE)
  .then(compress)
  .then(serialize);

engine
  .pipeline<MessageEvent<string>>(Hook.RECEIVE_MESSAGE)
  .then(deserialize)
  .then(decompress);

socket.onMessage(x => engine.trigger(Hook.RECEIVE_MESSAGE, x));
engine.register<string>(Hook.SEND_MESSAGE, x => socket.send(x));

socket.onOpen(() =>
  getUserName()
    .then(async username => {
      await renderer.whenReady;
      return username;
    })
    .then(username => {
      engine.send(ClientMessageType.LOGIN, {
        uuid: state.uuid,
        username,
      });
    }),
);

socket.onReconnect(() =>
  engine.send(ClientMessageType.RECONNECT, {
    uuid: state.uuid,
    username: state.me!.name,
  }),
);

// MESSAGING

engine.onMessage(ServerMessageType.LOGIN_SUCCESS, data => {
  state.setUsers(data.users);
  state.setObstacles(data.obstacles);
});

engine.onMessage(ServerMessageType.USER_CONNECTED, data =>
  state.addUser(new ClientUser(data.user)),
);

engine.onMessage(ServerMessageType.USER_DISCONNECTED, data =>
  state.removeUser(data.uuid),
);

engine.onMessage(ServerMessageType.GAME_STEP, ({ users, entities }) => {
  state.setUsers(users);
  state.setEntities(entities as DeadBody[]);

  if (!state.me) {
    throw new Error(`Can't find player in user list. UUID-${state.uuid}`);
  }

  renderer.centerCameraAt(state.me.player.position);
  renderer.render(state);
});

// ON CLOSE

window.onbeforeunload = () => engine.send(ClientMessageType.LOGOUT);
