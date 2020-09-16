import { SerializedUser } from '../../shared/SerializedUser';
import { PeerChannel } from './PeerChannel';

export class User implements SerializedUser {
  id;
  name;
  position = { x: 0, y: 0 };

  private connection: PeerChannel | null = null;

  get isCalling() {
    return Boolean(this.connection);
  }

  constructor(serialized: SerializedUser) {
    this.id = serialized.id;
    this.name = serialized.name;
  }

  callStarted(connection: PeerChannel) {
    this.connection = connection;
  }

  acceptAnswer(answer: RTCSessionDescription): void {
    this.connection!.acceptAnswer(answer);
  }

  hangup() {
    this.connection?.end();
    this.connection = null;
  }

  dispose() {
    this.hangup();
  }
}
