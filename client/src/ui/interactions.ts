import { KeyboardActions, KeyCode } from '@amatiasq/keyboard';

import { Action } from '../../../shared/Action';
import { UserName } from '../../../shared/types';

const keyboard = new KeyboardActions<Action>();

keyboard.setDirections(Action.UP, Action.DOWN, Action.LEFT, Action.RIGHT);

keyboard.setKeyMap(KeyCode.KeyK, Action.KILL);
keyboard.setKeyMap(KeyCode.KeyR, Action.RESURRECT);
keyboard.setKeyMap(KeyCode.KeyM, Action.COMMIT_SUICIDE);

export function watchKeyboard(notify: (actions: Action[]) => void) {
  keyboard.onChange(actions => notify(actions));
}

export async function getUserName() {
  const key = 'amongus:username';
  const stored = sessionStorage.getItem(key);

  // document.querySelector('#logout')!.addEventListener('click', e => {
  //   sessionStorage.removeItem(key);
  //   location.reload();
  // });

  if (stored) {
    return Promise.resolve(stored as UserName);
  }

  const $dialog = document.querySelector<HTMLDialogElement>('#login')!;
  const $form = $dialog.querySelector<HTMLFormElement>('form')!;
  const $input = $form?.querySelector<HTMLInputElement>('input[type=text]')!;

  $dialog.showModal();

  return new Promise<UserName>((resolve, reject) => {
    $form.addEventListener('submit', e => {
      const value = $input.value.trim();
      sessionStorage.setItem(key, value);
      resolve(value as UserName);
    });
  });
}
