export enum EngineHook {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  MESSAGE_SENT,
}

export type Hook<In, Out> = (x: In) => Out;

export class GameEngine {
  private readonly channels = new Map<EngineHook, Function[]>();
  private readonly pipes = new Map<EngineHook, Function[]>();

  trigger<In>(hook: EngineHook, initial?: In) {
    const pipes = this.pipes.get(hook);
    const channels = this.channels.get(hook);

    if (!pipes && !channels) return;

    const event = pipes
      ? pipes.reduce((value, fn) => fn(value), initial)
      : initial;

    if (channels) {
      channels.forEach(x => x(event));
    }
  }

  register<In, Out = In>(hook: EngineHook, handler: (data: In) => Out) {
    if (!this.channels.has(hook)) {
      this.channels.set(hook, [handler]);
      return;
    }

    const list = this.channels.get(hook)!;
    list.push(handler);
  }

  pipeline<In>(hook: EngineHook) {
    this.pipes.set(hook, []);
    return this.createPipe<In>(hook);
  }

  private createPipe<In>(hook: EngineHook) {
    return {
      p ipe: <Out>(handler: (value: In) => Out) => {
        this.pipes.get(hook)!.push(handler);
        return this.createPipe<Out>(hook);
      },
    };
  }
}

// type F<In, Out> = (x: In) => Out;

// // prettier-ignore
// type Pipeline<In, Out, M extends any[]> =
//   | [F<In, Out>]
//   | [F<In, M[0]>, F<M[0], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], M[5]>, F<M[5], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], M[5]>, F<M[5], M[6]>, F<M[6], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], M[5]>, F<M[5], M[6]>, F<M[6], M[7]>, F<M[7], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], M[5]>, F<M[5], M[6]>, F<M[6], M[7]>, F<M[7], M[8]>, F<M[8], Out>]
//   | [F<In, M[0]>, F<M[0], M[1]>, F<M[1], M[2]>, F<M[2], M[3]>, F<M[3], M[4]>, F<M[4], M[5]>, F<M[5], M[6]>, F<M[6], M[7]>, F<M[7], M[8]>, F<M[8], M[9]>, F<M[9], Out>]

// const gameEngine = new GameEngine();

// type Message = void;
// type CompressedList = void;
// type Serialized = void;
// type Binary = void;

// const potato = () => {};
// const compress = () => {};
// const serialize = () => {};
// const toJSON = () => {};
// const toBinary = () => {};

// // gameEngine.register(BEFORE_SEND, superComplicatedFunction1);
// gameEngine.register(EngineHook.SEND_MESSAGE, potato as Hook<void, Message>);
// gameEngine.register(
//   EngineHook.SEND_MESSAGE,
//   compress as Hook<Message, CompressedList>,
// );
// gameEngine.register(
//   EngineHook.SEND_MESSAGE,
//   serialize as Hook<CompressedList, Serialized>,
// );
// // gameEngine.register(
// //   EngineHook.SEND_MESSAGE,
// //   toJSON as Hook<Serialized, string>,
// // );
// gameEngine.register(EngineHook.SEND_MESSAGE, toBinary as Hook<string, Binary>);

// // // binary => string => compressedSerialiezList => SerializedList => Players
// // gameEngine.register(BEFORE_RECEIVED, fromBinary);
// // gameEngine.register(BEFORE_RECEIVED, fromJSON);
// // gameEngine.register(BEFORE_RECEIVED, unserialize);
// // gameEngine.register(BEFORE_RECEIVED, uncompress);

// // gameEngine.register(BEFORE_RECEIVED, superComplicatedFunction5);
