export enum EngineHook {
  SEND_MESSAGE,
  MESSAGE_SENT,
}

export type Hook<In, Out> = (x: In) => Out;

export class GameEngine {
  private readonly channels = new Map<EngineHook, Function[]>();

  trigger<In>(hook: EngineHook, initial?: In) {
    if (!this.channels.has(hook)) return;

    const list = this.channels.get(hook)!;
    return list.reduce((value, fn) => fn(value), initial);
  }

  register<In, Out = In>(hook: EngineHook, handler: (data: In) => Out) {
    if (!this.channels.has(hook)) {
      this.channels.set(hook, [handler]);
      return;
    }

    const list = this.channels.get(hook)!;
    list.push(handler);
  }
}

const gameEngine = new GameEngine();

type Message = void;
type CompressedList = void;
type Serialized = void;
type Binary = void;

const potato = () => {};
const compress = () => {};
const serialize = () => {};
const toJSON = () => {};
const toBinary = () => {};

// gameEngine.register(BEFORE_SEND, superComplicatedFunction1);
gameEngine.register(EngineHook.SEND_MESSAGE, potato as Hook<void, Message>);
gameEngine.register(
  EngineHook.SEND_MESSAGE,
  compress as Hook<Message, CompressedList>,
);
gameEngine.register(
  EngineHook.SEND_MESSAGE,
  serialize as Hook<CompressedList, Serialized>,
);
// gameEngine.register(
//   EngineHook.SEND_MESSAGE,
//   toJSON as Hook<Serialized, string>,
// );
gameEngine.register(EngineHook.SEND_MESSAGE, toBinary as Hook<string, Binary>);

// // binary => string => compressedSerialiezList => SerializedList => Players
// gameEngine.register(BEFORE_RECEIVED, fromBinary);
// gameEngine.register(BEFORE_RECEIVED, fromJSON);
// gameEngine.register(BEFORE_RECEIVED, unserialize);
// gameEngine.register(BEFORE_RECEIVED, uncompress);

// gameEngine.register(BEFORE_RECEIVED, superComplicatedFunction5);
