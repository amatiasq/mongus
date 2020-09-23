import { DeadBody } from '../../shared/models/DeadBody';
import { Player } from '../../shared/models/Player';
import { Orientation } from '../../shared/Orientation';
import { Color } from './Color';
import { PlayerSprite } from './PlayerSprite';

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;
const playerSprite = new PlayerSprite('assets/sprites/player.png');
const phantomSprite = new PlayerSprite('assets/sprites/phantom.png');
const bodySprite = new PlayerSprite('assets/sprites/body.png');

fullscreen();
window.onresize = fullscreen;

function fullscreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function render(players: Player[], bodies: DeadBody[]) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  bodies.forEach(body => {
    const sprite = bodySprite.getColor(Color.fromHex(body.color));

    context.save();
    context.translate(body.position.x, body.position.y);

    if (body.orientation === Orientation.Right) {
      context.scale(-1, 1);
    }

    context.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
    context.restore();
  });

  players.forEach(player => {
    const color = Color.fromHex(player.color);
    const baseSprite = player.isDead ? phantomSprite : playerSprite;
    const sprite = baseSprite.getColor(color);

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

    context.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
    context.globalAlpha = 1;
    context.restore();
  });
}
