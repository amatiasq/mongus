import { DeadBody } from '../../../shared/models/DeadBody';
import { Player } from '../../../shared/models/Player';
import { Orientation } from '../../../shared/Orientation';
import { chain } from '../../../shared/util';
import { getCenterOf, multiply, sum, Vector } from '../../../shared/Vector';
import { Color } from './Color';
import { PlayerSprite } from './PlayerSprite';

// const half = multiply(0.5);
const negate = multiply(-1);

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;

const playerSprite = new PlayerSprite('assets/sprites/player.png');
const phantomSprite = new PlayerSprite('assets/sprites/phantom.png');
const bodySprite = new PlayerSprite('assets/sprites/body.png');
const background = Object.assign(new Image(), {
  src: 'assets/map/Cafeteria-sharedassets0.assets-210.png',
});

let camera = { x: 0, y: 0 };

initFullscreen();

export function centerCameraAt({ x, y }: Vector) {
  camera = { x, y };
}

export function render(players: Player[], bodies: DeadBody[]) {
  const offset = chain(getCenterOf(canvas), sum(negate(camera)));
  const bgPos = chain(getCenterOf(background), negate);

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(offset.x, offset.y);
  context.drawImage(background, bgPos.x, bgPos.y);

  bodies.forEach(renderDeadBody);
  players.forEach(renderPlayer);

  context.restore();
}

function renderDeadBody(body: DeadBody) {
  const sprite = bodySprite.getColor(Color.fromHex(body.color));
  const spritePos = chain(getCenterOf(sprite), negate);

  context.save();
  context.translate(body.position.x, body.position.y);

  if (body.orientation === Orientation.Right) {
    context.scale(-1, 1);
  }

  context.drawImage(sprite, spritePos.x, spritePos.y);
  context.restore();
}

function renderPlayer(player: Player) {
  const color = Color.fromHex(player.color);
  const baseSprite = player.isDead ? phantomSprite : playerSprite;
  const sprite = baseSprite.getColor(color);
  const spritePos = chain(getCenterOf(sprite), negate);

  // context.fillStyle = color.rgb;
  // context.textAlign = 'center';

  // context.fillText(
  //   user.id,
  //   user.position.x,
  //   user.position.y - 15 - player.height / 2,
  // );

  context.save();

  if (player.isDead) {
    context.globalAlpha = 0.8;
  }

  context.translate(player.position.x, player.position.y);

  if (player.orientation === Orientation.Left) {
    context.scale(-1, 1);
  }

  context.drawImage(sprite, spritePos.x, spritePos.y);
  context.globalAlpha = 1;
  context.restore();
}

function initFullscreen() {
  fullscreen();
  window.onresize = fullscreen;

  // document.addEventListener('keydown', requestFullscreen);
  // document.addEventListener('mousemove', requestFullscreen);

  // function requestFullscreen() {
  //   canvas.parentElement!.requestFullscreen();
  //   document.removeEventListener('keydown', requestFullscreen);
  //   document.removeEventListener('mousemove', requestFullscreen);
  // }

  function fullscreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
