import { DeadBody } from '../../shared/models/DeadBody';
import { Player } from '../../shared/models/Player';
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

    context.drawImage(
      sprite,
      body.position.x - sprite.width / 2,
      body.position.y - sprite.height / 2,
    );
  });

  players.forEach(player => {
    const color = Color.fromHex(player.color);
    // context.fillStyle = color.rgb;
    // context.textAlign = 'center';

    // context.fillText(
    //   user.id,
    //   user.position.x,
    //   user.position.y - 15 - player.height / 2,
    // );

    if (player.isDead) {
      const sprite = phantomSprite.getColor(color);
      context.globalAlpha = 0.8;

      context.drawImage(
        sprite,
        player.position.x - sprite.width / 2,
        player.position.y - sprite.height / 2,
      );

      context.globalAlpha = 1;
    } else {
      const sprite = playerSprite.getColor(color);

      context.drawImage(
        sprite,
        player.position.x - sprite.width / 2,
        player.position.y - sprite.height / 2,
      );
    }
  });
}
