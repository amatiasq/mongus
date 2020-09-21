import { Vector } from '../../shared/Vector';
import { loadImage } from './assets';
import { Color } from './Color';
import { getCanvas } from './ui';

const canvas = getCanvas();
const context = canvas.getContext('2d')!;

let player: HTMLImageElement;
loadImage('../assets/sprites/player.png').then(x => (player = x));

export function render(user: Vector, others: Vector[]) {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);

  const otherColors = getColoredPlayer(Color.GREEN)!;
  const selfColor = getColoredPlayer(Color.GREEN)!;

  others.forEach(user => renderPlayer(user.x, user.y, otherColors));

  renderPlayer(user.x, user.y, selfColor);

  context.restore();
}

function renderPlayer(x: number, y: number, image: CanvasImageSource) {
  context.drawImage(image, x, y);
}

const cache = new Map<string, CanvasImageSource>();

function getColoredPlayer(color: Color) {
  const rgba = color.toRgba();

  if (cache.has(rgba)) {
    return cache.get(rgba);
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const { width, height } = player;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(player, 0, 0);

  const dark = new Color(color.r, color.g, color.b, (1 / 255) * 100);

  const image = context.getImageData(0, 0, width, height);
  const { data } = image;

  for (let i = 0; i < data.length; i += 4) {
    const pixel = new Color(data[i + 0], data[i + 1], data[i + 2]);

    if (pixel.isReddish) {
      color.setTo(data, i);
    } else if (pixel.isBlueish || pixel.isPurpleish) {
      dark.setTo(data, i);
    }
  }

  context.putImageData(image, 0, 0);

  cache.set(rgba, canvas);
  return canvas;
}
