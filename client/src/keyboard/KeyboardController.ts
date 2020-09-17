import { KeyCode } from './KeyCode';

type EnumDeclaration = number | string;

export class KeyboardController<T extends EnumDeclaration> {
  private readonly keymap: { [id: string]: T } = {};
  private readonly actions = new Set<T>();
  private readonly codeToKey = new Map<KeyCode, string>();

  constructor() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  setKeyMap(key: KeyCode, action: T) {
    this.keymap[key] = action;
  }

  isActive(action: T) {
    return this.actions.has(action);
  }

  /*
   * Helpers
   */

  setDirections(up: T, down: T, left: T, right: T) {
    this.setArrows(up, down, left, right);
    this.setWSAD(up, down, left, right);
  }

  setArrows(up: T, down: T, left: T, right: T) {
    this.keymap[KeyCode.ArrowUp] = up;
    this.keymap[KeyCode.ArrowDown] = down;
    this.keymap[KeyCode.ArrowLeft] = left;
    this.keymap[KeyCode.ArrowRight] = right;
  }

  setWSAD(up: T, down: T, left: T, right: T) {
    this.keymap[KeyCode.KeyW] = up;
    this.keymap[KeyCode.KeyS] = down;
    this.keymap[KeyCode.KeyA] = left;
    this.keymap[KeyCode.KeyD] = right;
  }

  /*
   * Internals
   */

  private onKeyDown(event: KeyboardEvent) {
    const action = this.getActionForEvent(event);

    if (action != null) {
      this.actions.add(action);
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    const action = this.getActionForEvent(event);

    if (action != null) {
      this.actions.delete(action);
    }
  }

  private getActionForEvent(event: KeyboardEvent) {
    const code = event.code as KeyCode;
    this.codeToKey.set(code, event.key);

    if (!KeyCode[code]) {
      console.log(`Missing key code: ${code}`);
    }

    return this.keymap[code];
  }
}
