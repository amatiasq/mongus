import { DeadBody } from '../../../shared/models/DeadBody';
import { Obstacle } from '../../../shared/models/Obstacle';
import { Player } from '../../../shared/models/Player';
import { Orientation } from '../../../shared/Orientation';
import { chain } from '../../../shared/util';
import { getCenterOf, minus, Vector } from '../../../shared/Vector';
import { getColorPatch } from './getColorPatch';
import { SpriteManager } from './SpriteManager';

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;

const sprites = new SpriteManager({
  player: 'assets/sprites/player.png',
  phantom: 'assets/sprites/phantom.png',
  body: 'assets/sprites/body.png',
  background: 'assets/map/Cafeteria-sharedassets0.assets-210.png',
});

let camera = { x: 0, y: 0 };

initFullscreen();

export function centerCameraAt({ x, y }: Vector) {
  camera = { x, y };
}

export function render(
  players: Player[],
  bodies: DeadBody[],
  obstacles: Obstacle[],
) {
  const middle = getCenterOf(canvas);
  const offset = chain(middle, minus(camera));
  const background = sprites.get('background');

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(offset.x, offset.y);

  background.renderTo(context);

  obstacles.forEach(renderObstacle);
  bodies.forEach(renderDeadBody);
  players.forEach(renderPlayer);

  context.restore();

  visibilityRange(middle);
}

function renderObstacle({ x, y, width, height }: Obstacle) {
  context.strokeStyle = 'red';
  context.strokeRect(x, y, width, height);
}

function renderDeadBody(body: DeadBody) {
  const sprite = sprites
    .getColored('body', getColorPatch(body.color))
    .at(body.position);

  if (body.orientation === Orientation.Right) {
    sprite.flip();
  }

  sprite.renderTo(context);
}

function renderPlayer(player: Player) {
  const baseSprite = player.isDead ? 'phantom' : 'player';
  const sprite = sprites
    .getColored(baseSprite, getColorPatch(player.color))
    .at(player.position);

  context.fillStyle = player.color;
  context.textAlign = 'center';
  context.font = '18px arial';

  context.fillText(
    player.name,
    player.position.x,
    player.position.y - 15 + sprite.offset.y,
  );

  if (player.orientation === Orientation.Left) {
    sprite.flip();
  }

  context.save();

  if (player.isDead) {
    context.globalAlpha = 0.8;
  }

  sprite.renderTo(context);
  context.globalAlpha = 1;
  context.restore();
}

function visibilityRange({ x, y }: Vector) {
  const gradient = context.createRadialGradient(x, y, 100, x, y, 400);

  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(1, 'black');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
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
