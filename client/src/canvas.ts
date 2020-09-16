import { Vector } from '../../shared/Vector';
import { getCanvas } from './ui';

const canvas = getCanvas();
const context = canvas.getContext('2d')!;

export function render(user: Vector, others: Vector[]) {
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  others.forEach(user => drawCircle(user.x, user.y, '#FF8888'));
  drawCircle(user.x, user.y, '#88ff88');
  context.restore();
}

function drawCircle(x: number, y: number, color: string) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, 15, 0, Math.PI * 2);
  context.fill();
  context.closePath();
}
