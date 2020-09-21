import {
  RoomMessage,
  RoomMessageType,
} from './../../shared/communication/RoomMessage';
import { ClientMessageType } from '../../shared/communication/ClientMessage';
import { ClientToClientMessageType } from '../../shared/communication/ClientToClientMessage';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { UserName, UserId } from '../../shared/types';
import { captureAudio } from './audio';
import { runFrame } from './game';
import { PeerChannel } from './PeerChannel';
import { Socket } from './Socket';
import { getUserName, renderUsername, whenUserClicked } from './ui';
import { User } from './User';
import {
  getUserById,
  setUserList,
  userConnected,
  userDisconnected,
} from './users';
import { Vector } from '../../shared/Vector';
import { init } from './assets';

const t = ServerMessageType;
// const socket = new Socket('ws://localhost:17965');
const socket = new Socket('wss://amongus.amatiasq.com');

whenUserClicked(toggleCall);
init();

socket.onMessage(t.HANDSHAKE, login);
socket.onMessage(t.LOGIN_RESULT, data => handleLoginResult(data));
socket.onMessage(t.USER_CONNECTED, data => userConnected(data.user));
socket.onMessage(t.USER_DISCONNECTED, data => userDisconnected(data.user));

socket.onMessage(t.MESSAGE_TO_ROOM, ({ from, message }) => {
  const user = getValidUser(from);
  if (!user) return;

  switch (message.type) {
    case RoomMessageType.POSITION_CHANGED:
      return updatePosition(user, message.position);
  }
});

socket.onMessage(t.MESSAGE_FROM_USER, ({ from, message }) => {
  const user = getValidUser(from);
  if (!user) return;

  switch (message.type) {
    case ClientToClientMessageType.RPC_OFFER:
      return receiveOffer(user, message.offer);
    case ClientToClientMessageType.RPC_ANSWER:
      return user.acceptAnswer(message.answer);
    case ClientToClientMessageType.REJECT_OFFER:
      return user.hangup();
  }
});

async function login() {
  const name = await getUserName();
  renderUsername(name);
  socket.send({ type: ClientMessageType.LOGIN, name });
}

function handleLoginResult(data: ServerMessage) {
  if (data.type !== ServerMessageType.LOGIN_RESULT) {
    return;
  }

  if (!data.success) {
    alert(data.message);
    sessionStorage.clear();
    location.reload();
    return;
  }

  setUserList(data.users);
  startGame(data.name);
}

function startGame(name: UserName) {
  const me = new User({ id: 'me' as UserId, name });

  frame();

  function frame() {
    const before = { ...me.position };
    runFrame(me);

    if (before.x !== me.position.x || before.y !== me.position.y) {
      socket.send({
        type: ClientMessageType.SEND_TO_ROOM,
        message: {
          type: RoomMessageType.POSITION_CHANGED,
          position: me.position,
        },
      });
    }

    requestAnimationFrame(frame);
  }
}

function updatePosition(user: User, position: Vector) {
  user.position = position;
}

function toggleCall(user: User) {
  return user.isCalling ? user.hangup() : callUser(user);
}

async function callUser(user: User) {
  const conn = new PeerChannel(user, m => socket.send(m));
  const stream = await captureAudio();

  stream.getTracks().forEach(x => conn.addTrack(x, stream));
  conn.sendOffer();

  user.callStarted(conn);
  return conn;
}

async function receiveOffer(user: User, offer: RTCSessionDescription) {
  console.log(`${user.name} quiere iniciar una llamada`);
  const shouldAnswer = await confirm(
    `${user.name} quiere iniciar una llamada.<br>Contestar?`,
  );

  if (!shouldAnswer) {
    console.log(`Llamada de ${user.name} rechazada`);
    socket.send({
      type: ClientMessageType.SEND_TO_USER,
      to: user.id,
      message: { type: ClientToClientMessageType.REJECT_OFFER },
    });
    return;
  }

  console.log(`Llamada de ${user.name} aceptada`);
  const conn = new PeerChannel(user, m => socket.send(m));

  conn.acceptOffer(offer);
  console.log(`Enviando respuesta a ${user.name}...`);

  user.callStarted(conn);
  return conn;
}

function getValidUser(id: UserId) {
  const user = getUserById(id);

  if (user) {
    return user;
  }

  socket.send({
    type: ClientMessageType.ERROR,
    message: `Received message from unknown user ${id}`,
  });
}
