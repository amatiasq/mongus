import { KeyboardActions, KeyCode } from '@amatiasq/keyboard';

import { Action } from '../../../shared/Action';

const keyboard = new KeyboardActions<Action>();

keyboard.setDirections(Action.UP, Action.DOWN, Action.LEFT, Action.RIGHT);
keyboard.setKeyMap(KeyCode.KeyK, Action.KILL);

export function watchKeyboard(notify: (actions: Action[]) => void) {
  keyboard.onChange(actions => notify(actions));
}
