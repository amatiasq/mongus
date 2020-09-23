/// <reference path="./node-gameloop.d.ts" />
import { Universe } from './Universe';
import { createServer } from 'http';
import { setGameLoop } from 'node-gameloop';

import { NiceSocketServer } from '@amatiasq/nice-socket';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { Socket } from './Socket';
import { User } from './User';
import { broadcast, getAllUsers, getUserById, login, logout } from './users';
import { step } from './game';

const FRAMES = 30;
let frameCount = 0;

const port = process.env.PORT || 17965;
const server = createServer();
const webSocketServer = new NiceSocketServer<ClientMessage, ServerMessage>(
  server,
);

server.listen(port, () => console.log(`Websocket server ready at ${port}`));

const universe = new Universe();

const gameloopId = setGameLoop((delta: number) => {
  frameCount++;

  universe.users = getAllUsers();
  step(delta, universe);
  broadcast({
    type: ServerMessageType.GAME_STEP,
    ...universe.toJSON(),
  });
});

setInterval(() => {
  console.log(`Averag FPS in 5 seconds: ${frameCount / 5}`);
  frameCount = 0;
}, 5000);

webSocketServer.onConnection(nice => {
  const socket = new Socket(nice);
  let user: User;

  socket.onClose(() => user && user.afk());

  socket.onMessageType(ClientMessageType.RECONNECT, data => {
    const user = getUserById(data.uuid) || login(socket, data.uuid);
    user.back();
    onUserConnected(user, socket);
  });

  socket.onMessageType(ClientMessageType.LOGIN, data => {
    user = login(socket, data.uuid);
    onUserConnected(user, socket);
  });

  socket.send({ type: ServerMessageType.HANDSHAKE });
});

function onUserConnected(user: User, socket: Socket) {
  socket.onMessageType(
    ClientMessageType.USER_ACTIONS,
    data => (user.actions = new Set(data.actions)),
  );

  socket.onMessageType(ClientMessageType.LOGOUT, data => logout(user.id));
}
