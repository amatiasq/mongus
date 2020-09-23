import { DeadBody } from './../../shared/DeadBody';
import { Color } from './Color';
import { PlayerSprite } from './PlayerSprite';
import { User } from './User';

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;
const player = new PlayerSprite('assets/sprites/player.png');
const phantom = new PlayerSprite('assets/sprites/phantom.png');
const body = new PlayerSprite('assets/sprites/body.png');

fullscreen();
window.onresize = fullscreen;

function fullscreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function render(users: User[], entities: DeadBody[]) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  entities.forEach(entity => {
    const sprite = body.getColor(Color.fromHex(entity.color));

    context.drawImage(
      sprite,
      entity.position.x - sprite.width / 2,
      entity.position.y - sprite.height / 2,
    );
  });

  users.forEach(user => {
    context.fillStyle = user.color.rgb;
    context.textAlign = 'center';

    context.fillText(
      user.id,
      user.position.x,
      user.position.y - 15 - player.height / 2,
    );

    if (user.isDead) {
      const sprite = phantom.getColor(user.color);
      context.globalAlpha = 0.8;

      context.drawImage(
        sprite,
        user.position.x - sprite.width / 2,
        user.position.y - sprite.height / 2,
      );

      context.globalAlpha = 1;
    } else {
      const sprite = player.getColor(user.color);

      context.drawImage(
        sprite,
        user.position.x - sprite.width / 2,
        user.position.y - sprite.height / 2,
      );
    }
  });
}
