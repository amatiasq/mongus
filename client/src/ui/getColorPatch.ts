import { ColorPatch } from './SpriteManager';
import { Color } from './Color';

const cache: { [hex: string]: ColorPatch } = {};

export function getColorPatch(hex: string) {
  if (cache[hex]) {
    return cache[hex];
  }

  const base = Color.fromHex(hex);
  const dark = base.shade(0.5);

  const patches: ColorPatch = new Map();

  patches.set(isReddish, base);
  patches.set(isBlueish, dark);
  patches.set(isPurpleish, dark);

  cache[hex] = patches;
  return patches;
}

function isReddish(color: Color) {
  return isPredominant(color.r, color.g, color.b);
}

function isBlueish(color: Color) {
  return isPredominant(color.b, color.r, color.g);
}

function isPurpleish(color: Color) {
  return color.r === color.b && color.r > color.g;
}

function isPredominant(x: number, a: number, b: number) {
  return x > 10 && x > a && x > b;
}
