import { PeerConnection } from '@amatiasq/peer-connection';

import {
  ClientMessage,
  ClientMessageType,
} from '../../shared/communication/ClientMessage';
import { ClientToClientMessageType } from '../../shared/communication/ClientToClientMessage';
import { captureAudio, playAudio } from './audio';
import { User } from './User';
import { refreshUserList } from './users';

export class PeerChannel {
  private readonly conn = this.createRtc();

  constructor(
    public readonly user: User,
    private readonly send: (message: ClientMessage) => void,
  ) {}

  async sendOffer() {
    // this.createDataChannel();
    const offer = await this.conn.createOffer({ offerToReceiveAudio: true });

    await this.send({
      type: ClientMessageType.SEND_TO_USER,
      to: this.user.id,
      message: {
        type: ClientToClientMessageType.RPC_OFFER,
        offer,
      },
    });
  }

  async acceptOffer(offer: RTCSessionDescription) {
    const stream = await captureAudio();
    this.conn.addStream(stream);

    const answer = await this.conn.acceptOffer(offer, {
      offerToReceiveAudio: true,
    });

    await this.send({
      type: ClientMessageType.SEND_TO_USER,
      to: this.user.id,
      message: {
        type: ClientToClientMessageType.RPC_ANSWER,
        answer,
      },
    });
  }

  acceptAnswer(answer: RTCSessionDescription) {
    return this.conn.acceptAnswer(answer);
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    console.log(`Enviando audio a ${this.user.name}.`);
    return this.conn.addTrack(track, stream);
  }

  end() {
    this.conn.close();
  }

  private createRtc() {
    const conn = new PeerConnection();

    conn.onTrackReceived(e => {
      console.log(`Recibiendo audio de ${this.user.name}.`);
      playAudio(e.streams[0]);
      refreshUserList();
    });

    return conn;
  }
}
