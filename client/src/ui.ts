import { UserName } from '../../shared/types';
import { User } from './User';

const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
  document.querySelector(selector) as T;

const userList = $('#userlist');
let onUserClicked: Function;

export function whenUserClicked(listener: Function) {
  onUserClicked = listener;
}

export function getCanvas() {
  const canvas = $<HTMLCanvasElement>('canvas');
  const parent = canvas.parentElement!;

  window.addEventListener('resize', fill);
  fill();

  return canvas;

  function fill() {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
}

export async function getUserName() {
  const key = 'amongus:username';
  const stored = sessionStorage.getItem(key);

  $('#logout')!.addEventListener('click', e => {
    sessionStorage.removeItem(key);
    location.reload();
  });

  if (stored) {
    return Promise.resolve(stored as UserName);
  }

  const $dialog = $<HTMLDialogElement>('#login');
  const $form = $dialog.querySelector('form') as HTMLFormElement;
  const $input = $form?.querySelector('input[type=text]') as HTMLInputElement;

  $dialog.showModal();

  return new Promise<UserName>((resolve, reject) => {
    $form.addEventListener('submit', e => {
      const value = $input.value.trim();
      sessionStorage.setItem(key, value);
      resolve(value as UserName);
    });
  });
}

export function renderUsername(name: string) {
  const parent = $('#username');
  parent.innerHTML = name;
}

export function confirm(question: string) {
  const $template = $<HTMLTemplateElement>('#confirm-dialog');
  const $dialog = document.importNode($template.content, true)
    .firstElementChild as HTMLDialogElement;

  document.body.appendChild($dialog);

  const get = (selector: string) => $dialog.querySelector(selector)!;
  get('.question')!.innerHTML = question;

  return new Promise(resolve => {
    get('.yes')!.addEventListener('click', () => resolve(true));
    get('.no')!.addEventListener('click', () => resolve(false));
    $dialog.showModal();
  }).then(result => {
    $dialog.remove();
    return result;
  });
}

export function renderUsers(users: User[]) {
  userList.innerHTML = '';

  for (const user of users) {
    const el = document.createElement('div');

    const buttonClick = async () => {
      await onUserClicked(user);
      renderUsers(users);
    };

    const suffix = user.isCalling ? '(llamando...)' : '';

    const button = document.createElement('button');
    button.innerHTML = `${user.name} ${suffix}`;
    button.onclick = buttonClick;
    el.appendChild(button);

    userList.appendChild(el);
  }
}
