const colors = [
  '#FF8888',
  '#88FF88',
  '#8888FF',
  '#FFFF88',
  '#88FFFF',
  '#FF88FF',
  '#FF5555',
  '#55FF55',
  '#5555FF',
  '#885555',
  '#558855',
  '#555588',
  '#888888',
  '#FFFFFF',
];
let colorIndex = 0;

export function getRandomColor() {
  return colors[colorIndex++ % colors.length];
}
