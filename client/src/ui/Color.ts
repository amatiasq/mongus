const HEX_REGEX = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/;
const SHORT_HEX_REGEX = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})?$/;
const RGB_REGEX = /^rgb\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;
const RGBA_REGEX = /^rgba\s*\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/;

const ALPHA = 3;
const DEFAULT_ALPHA = 1;
const HEXADECIMAL = 16;
const MAX_HEX = 255;

export class Color {
  static fromArray([r, g, b, a]: [number, number, number] | ColorArray) {
    return new Color(r, g, b, a == null ? DEFAULT_ALPHA : a);
  }

  static fromHex(value: string) {
    const array = parseHex(value.trim());
    return this.fromArray(array);
  }

  static fromRgb(value: string) {
    const array = parseRgb(value.trim());
    return this.fromArray(array);
  }

  static fromImageData(data: Uint8ClampedArray, i: number) {
    return new Color(data[i], data[i + 1], data[i + 2], data[i + 3]);
  }

  get hex() {
    return generateHex(this);
  }

  get rgb() {
    return `rgba(${this.toArray().join(', ')})`;
  }

  get brightness() {
    return calculateBrightness(this);
  }

  get isLight() {
    return this.brightness > 0.5;
  }

  get isDark() {
    return this.brightness <= 0.5;
  }

  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
    public readonly a = DEFAULT_ALPHA,
  ) {}

  isLigherThan(color: Color) {
    return this.brightness > color.brightness;
  }

  isDarkerThan(color: Color) {
    return this.brightness < color.brightness;
  }

  isEqual(color: Color) {
    return (
      this.r === color.r &&
      this.g === color.g &&
      this.b === color.b &&
      this.a === color.a
    );
  }

  shade(factor: number) {
    return new Color(
      ...(this.toArray().map(x => x * (1 - factor)) as ColorArray),
    );
  }

  setToImageData(data: Uint8ClampedArray, i: number, skipAlpha = false) {
    data[i] = this.r;
    data[i + 1] = this.g;
    data[i + 2] = this.b;

    if (!skipAlpha) {
      data[i + 3] = this.a * 255;
    }
  }

  toArray(): ColorArray {
    const { r, g, b, a } = this;
    return [r, g, b, a];
  }

  toString() {
    return this.rgb;
  }

  toJSON() {
    return this.rgb;
  }
}

type ColorArray = [number, number, number, number];

function calculateBrightness(color: Color) {
  return (color.r * 0.299 + color.g * 0.587 + color.b * 0.114) / 256;
}

function parseHex(value: string): ColorArray {
  const match = HEX_REGEX.exec(value) || SHORT_HEX_REGEX.exec(value);

  if (!match) {
    throw new Error('Invalid HEX color ' + value);
  }

  const hexValues = match.slice(1) as [string, string, string, string];
  hexValues[ALPHA] = hexValues[ALPHA] || 'FF';

  const array = hexValues.map(chunk => {
    const hex = chunk.length === 2 ? chunk : chunk + chunk;
    return parseInt(hex, HEXADECIMAL);
  }) as ColorArray;

  array[ALPHA] /= MAX_HEX;
  return array;
}

function parseRgb(value: string): ColorArray {
  const match = RGB_REGEX.exec(value) || RGBA_REGEX.exec(value);

  if (!match) {
    throw new Error('Invalid RGB color ' + value);
  }

  const [r, g, b, a] = match.slice(1) as [string, string, string, string];

  return [
    parseFloat(r),
    parseFloat(g),
    parseFloat(b),
    a == null ? DEFAULT_ALPHA : parseFloat(a),
  ];
}

function generateHex(color: Color) {
  const array = color.toArray();

  // Remove alpha if it's 1
  if (array[ALPHA] === 1) {
    array.length--;
  } else {
    array[ALPHA] = Math.round(array[ALPHA] * MAX_HEX);
  }

  const hex = array.map(x => x.toString(HEXADECIMAL));
  return '#' + hex.join('');
}
