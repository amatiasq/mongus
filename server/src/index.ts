import { RoomMessage } from './../../shared/communication/RoomMessage';
import { createServer } from 'http';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import { ClientToClientMessage } from '../../shared/communication/ClientToClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { serializeUser } from '../../shared/SerializedUser';
import { UserId, UserName } from '../../shared/types';
import { Vector } from '../../shared/Vector';
import {
  getConnectedUsers,
  getUserById,
  getUserBySocket,
  isUsernameAvailable,
  registerUser,
  removeUser,
} from './users';
import { bindWebsocketTo, NiceSocket } from './websocket';

const port = process.env.PORT || 17965;
const server = createServer();
const webSocketServer = bindWebsocketTo(server);

server.listen(port, () => console.log(`Websocket server ready at ${port}`));

webSocketServer.onConnection(ws => {
  ws.on('close', () => logout(ws));
  ws.onJsonMessage(data => processMessage(ws, data));
  ws.sendJson({ type: ServerMessageType.HANDSHAKE });
});

function processMessage(ws: NiceSocket, data: ClientMessage) {
  switch (data.type) {
    case ClientMessageType.ERROR:
      return reportError(ws, data.message);
    case ClientMessageType.LOGIN:
      return attemptLogin(ws, data.name);
    case ClientMessageType.LOGOUT:
      return logout(ws);
    case ClientMessageType.SEND_TO_USER:
      return deflect(ws, data.to, data.message);
    case ClientMessageType.SEND_TO_ROOM:
      return broadcast(ws, data.message);
    default:
      ws.sendJson({
        type: ServerMessageType.ERROR,
        message: `DAFUK U MEAN WITH ${(data as any).type}!?!?`,
      });
  }
}

function broadcast(ws: NiceSocket, message: RoomMessage) {
  const me = getAuthenticatedUser(ws);
  if (!me) return;

  const others = getConnectedUsers().filter(x => x !== me);

  others.forEach(x =>
    x.sendJson({
      type: ServerMessageType.MESSAGE_TO_ROOM,
      from: me.id,
      message,
    }),
  );
}

function reportError(ws: NiceSocket, message: string) {
  const user = getUserBySocket(ws);
  const name = user?.name || '(unknown)';
  console.error(`Error from ${name}: ${message}`);
}

function attemptLogin(ws: NiceSocket, name: UserName): void {
  if (!isUsernameAvailable(name)) {
    return ws.sendJson({
      type: ServerMessageType.LOGIN_RESULT,
      success: false,
      message: 'Username is unavailable',
    });
  }

  const otherUsers = getConnectedUsers();
  const newUser = registerUser(ws, name);

  ws.sendJson({
    type: ServerMessageType.LOGIN_RESULT,
    success: true,
    users: otherUsers.map(serializeUser),
    name,
  });

  for (const user of otherUsers) {
    user.socket.sendJson({
      type: ServerMessageType.USER_CONNECTED,
      user: serializeUser(newUser),
    });
  }

  console.log(`CONNECTED: ${name}`);
}

function logout(ws: NiceSocket) {
  const gone = getUserBySocket(ws);

  if (!gone) {
    return;
  }

  removeUser(gone);
  const users = getConnectedUsers();

  for (const user of users) {
    user.sendJson({
      type: ServerMessageType.USER_DISCONNECTED,
      user: serializeUser(gone),
    });
  }

  console.log(`DISCONNECTED: ${gone.name}`);
}

function deflect(ws: NiceSocket, to: UserId, message: ClientToClientMessage) {
  const user = getAuthenticatedUser(ws);
  if (!user) return;

  const target = getUserById(to);

  if (!target) {
    return user.sendJson({
      type: ServerMessageType.ERROR,
      message: `User "${name}" is not connected`,
    });
  }

  console.log(`DEFLECT from ${user.name} to ${target.name} - ${message.type}`);

  target.sendJson({
    type: ServerMessageType.MESSAGE_FROM_USER,
    from: user.id,
    message,
  });
}

function getAuthenticatedUser(ws: NiceSocket) {
  const user = getUserBySocket(ws);

  if (user) {
    return user;
  }

  ws.sendJson({
    type: ServerMessageType.ERROR,
    message: `You need to be authenticated`,
  });
}
