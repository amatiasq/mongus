import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ServerMessageType } from '../../shared/communication/ServerMessage';
import { DeadBody } from '../../shared/models/DeadBody';
import { Entity } from '../../shared/models/Entity';
import { User } from '../../shared/models/User';
import { decompressList } from '../../shared/util';
import { ClientSocket } from './ClientSocket';
import { ClientUser } from './ClientUser';
import { GameState } from './GameState';
import { getUserName, watchKeyboard } from './ui/interactions';
import { Renderer } from './ui/Renderer';

let FORCE_PROD_SERVER = false;
// FORCE_PROD_SERVER = true;

const serverUri =
  location.origin === 'https://amatiasq.github.io' || FORCE_PROD_SERVER
    ? 'wss://amongus.amatiasq.com'
    : 'ws://localhost:17965';

const socket = new ClientSocket(serverUri);
const state = new GameState();
const renderer = new Renderer(document.querySelector('canvas')!);

renderer.fillPage();
// renderer.fullscreen();

watchKeyboard(actions =>
  socket.send({
    type: ClientMessageType.USER_ACTIONS,
    actions: Array.from(actions),
  }),
);

socket.onOpen(() =>
  getUserName()
    .then(async username => {
      await renderer.whenLoaded;
      return username;
    })
    .then(username => {
      socket.send({
        type: ClientMessageType.LOGIN,
        uuid: state.uuid,
        username,
      });
    }),
);

socket.onReconnect(() =>
  socket.send({
    type: ClientMessageType.RECONNECT,
    uuid: state.uuid,
    username: state.me!.name,
  }),
);

socket.onMessageType(ServerMessageType.LOGIN_SUCCESS, data => {
  state.setUsers(data.users);
  state.setObstacles(data.obstacles);
});

socket.onMessageType(ServerMessageType.USER_CONNECTED, data =>
  state.addUser(new ClientUser(data.user)),
);

socket.onMessageType(ServerMessageType.USER_DISCONNECTED, data =>
  state.removeUser(data.uuid),
);

let frameUsers: User[];
let frameEntities: Entity[];

socket.onMessageType(ServerMessageType.GAME_STEP, data => {
  frameUsers = decompressList(data.users, frameUsers);
  frameEntities = decompressList(data.entities, frameEntities);

  state.setUsers(frameUsers);
  state.setEntities(frameEntities as DeadBody[]);

  if (!state.me) {
    throw new Error(`Can't find player in user list. UUID-${state.uuid}`);
  }

  renderer.centerCameraAt(state.me.player.position);
  renderer.render(state);
});

window.onbeforeunload = () => {
  socket.send({ type: ClientMessageType.LOGOUT });
};
