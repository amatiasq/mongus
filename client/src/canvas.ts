import { User } from './User';

const canvas = document.querySelector('canvas')!;
const context = canvas.getContext('2d')!;
const player = new Image();

player.src = 'assets/sprites/player.png';

fullscreen();
window.onresize = fullscreen;

function fullscreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function render(users: User[]) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  users.map(user => {
    context.fillStyle = user.isPlayer ? 'green' : 'red';
    context.textAlign = 'center';

    context.fillText(
      user.id,
      user.position.x,
      user.position.y - 15 - player.height / 2,
    );

    context.drawImage(
      player,
      user.position.x - player.width / 2,
      user.position.y - player.height / 2,
    );
  });
}
