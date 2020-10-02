export type Message<T> = {
  type: T;
  data?: any;
};

export type MessageData<
  Msg extends Message<any>,
  T extends Msg['type']
> = Extract<Msg & { type: T }, { type: T }>['data'];

export type MessageWriter<Msg extends Message<any>> = <
  Type extends Msg['type']
>(
  type: Type,
  data?: MessageData<Msg, Type>,
) => void;

export type MessageReader<Msg extends Message<any>> = <
  Type extends Msg['type']
>(
  type: Type,
  handler: (data: MessageData<Msg, Type>) => void,
) => void;
