import { KeyboardController } from '@amatiasq/keyboard';

export enum Action {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export const keyboard = new KeyboardController<Action>();

keyboard.setDirections(Action.UP, Action.DOWN, Action.LEFT, Action.RIGHT);
