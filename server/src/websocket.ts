import { INiceSocket, NiceSocket } from '@amatiasq/nice-socket';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';

export type ISocket = INiceSocket<ClientMessage, ServerMessage>;
export type Socket = NiceSocket<ClientMessage, ServerMessage>;
