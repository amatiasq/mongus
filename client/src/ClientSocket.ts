import { ClientMessage } from '../../shared/communication/ClientMessage';
import {
  MessageReader,
  MessageWriter,
} from '../../shared/communication/Message';
import { ServerMessage } from '../../shared/communication/ServerMessage';

export interface ClientSocket {
  send: MessageWriter<ClientMessage>;
  onMessage: MessageReader<ServerMessage>;
}
