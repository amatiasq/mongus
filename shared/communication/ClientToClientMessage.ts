export enum ClientToClientMessageType {
  RPC_OFFER = 'SEND_OFFER',
  RPC_ANSWER = 'SEND_ANSWER',
  REJECT_OFFER = 'REJECT_OFFER',
}

interface ClientToClientMessage__RPC_OFFER {
  type: ClientToClientMessageType.RPC_OFFER;
  offer: RTCSessionDescription;
}

interface ClientToClientMessage__RPC_ANSWER {
  type: ClientToClientMessageType.RPC_ANSWER;
  answer: RTCSessionDescription;
}

interface ClientToClientMessage__REJECT_OFFER {
  type: ClientToClientMessageType.REJECT_OFFER;
}

export type ClientToClientMessage =
  | ClientToClientMessage__RPC_OFFER
  | ClientToClientMessage__RPC_ANSWER
  | ClientToClientMessage__REJECT_OFFER;
