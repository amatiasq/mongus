export interface Vector {
  x: number;
  y: number;
}

export function serializeVector(vector: Vector) {
  return {
    x: Math.round(vector.x * 100) / 100,
    y: Math.round(vector.y * 100) / 100,
  };
}

export const multiply = (value: number) => (target: Vector) => ({
  x: target.x * value,
  y: target.y * value,
});

export const sum = (left: Vector) => (right: Vector) => ({
  x: left.x + right.x,
  y: left.y + right.y,
});

export function getMagnitude({ x, y }: Vector) {
  return Math.sqrt(x * x + y * y);
}

export function getCenterOf({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return { x: width / 2, y: height / 2 };
}

export function getDistance(a: Vector, b: Vector) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  // sqrt is not necessary since this it only be used as relative value
  return x * x + y * y;
}
