import { KeyboardController, KeyCode } from '@amatiasq/keyboard';
import { Action } from '../../shared/Action';

const keyboard = new KeyboardController<Action>();
const actions = new Set<Action>();

const keymaps = {
  [KeyCode.KeyW]: Action.UP,
  [KeyCode.KeyS]: Action.DOWN,
  [KeyCode.KeyA]: Action.LEFT,
  [KeyCode.KeyD]: Action.RIGHT,
  [KeyCode.ArrowUp]: Action.UP,
  [KeyCode.ArrowDown]: Action.DOWN,
  [KeyCode.ArrowLeft]: Action.LEFT,
  [KeyCode.ArrowRight]: Action.RIGHT,
};

export function watchKeyboard(notify: (actions: Action[]) => void) {
  Object.entries(keymaps).map(([key, action]) => {
    keyboard.onKeyDown(key as KeyCode, () => {
      actions.add(action);
      notify(Array.from(actions));
    });
    keyboard.onKeyUp(key as KeyCode, () => {
      actions.delete(action);
      notify(Array.from(actions));
    });
  });
}
