export interface Vector {
  x: number;
  y: number;
}

export function getDistance(a: Vector, b: Vector) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  // sqrt is not necessary since this it only be used as relative value
  return x * x + y * y;
}
