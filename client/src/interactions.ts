import { KeyboardActions } from '@amatiasq/keyboard';

import { Action } from '../../shared/Action';

const keyboard = new KeyboardActions<Action>();

keyboard.setDirections(Action.UP, Action.DOWN, Action.LEFT, Action.RIGHT);

export function watchKeyboard(notify: (actions: Action[]) => void) {
  keyboard.onChange(actions => notify(actions));
}
