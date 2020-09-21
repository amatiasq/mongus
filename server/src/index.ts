import { createServer } from 'http';

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
import { login, logout } from './users';

const port = process.env.PORT || 17965;
const server = createServer();
const webSocketServer = new NiceSocketServer<ClientMessage, ServerMessage>(
  server,
);

server.listen(port, () => console.log(`Websocket server ready at ${port}`));

webSocketServer.onConnection(nice => {
  const socket = new Socket(nice);
  let user: User;

  socket.onClose(() => user && user.afk());

  socket.onMessageType(
    ClientMessageType.RECONNECT,
    data => user && user.back(),
  );

  socket.onMessageType(
    ClientMessageType.LOGIN,
    data => (user = login(socket, data.uuid)),
  );

  socket.onMessageType(ClientMessageType.USER_ACTIONS, data => {
    user.actions = new Set(data.actions);
  });

  socket.onMessageType(ClientMessageType.LOGOUT, data => logout(user.id));

  socket.send({ type: ServerMessageType.HANDSHAKE });
});
