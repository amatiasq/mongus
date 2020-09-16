export enum Action {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

enum KeyboardKey {
  W = 'w',
  S = 's',
  A = 'a',
  D = 'd',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

const keymap = {
  [KeyboardKey.W]: Action.UP,
  [KeyboardKey.S]: Action.DOWN,
  [KeyboardKey.A]: Action.LEFT,
  [KeyboardKey.D]: Action.RIGHT,
  [KeyboardKey.ARROW_UP]: Action.UP,
  [KeyboardKey.ARROW_DOWN]: Action.DOWN,
  [KeyboardKey.ARROW_LEFT]: Action.LEFT,
  [KeyboardKey.ARROW_RIGHT]: Action.RIGHT,
};

const actions = new Set<Action>();

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event: KeyboardEvent) {
  const key = event.key as KeyboardKey;
  const action = keymap[key];

  if (action == null) {
    console.log('KeyDown', key, keymap[key]);
  } else {
    actions.add(action);
  }
}

function onKeyUp(event: KeyboardEvent) {
  const key = event.key as KeyboardKey;
  const action = keymap[key];

  if (action == null) {
    console.log('KeyUp', key);
  } else {
    actions.delete(action);
  }
}

export function isPressed(key: Action) {
  return actions.has(key);
}
