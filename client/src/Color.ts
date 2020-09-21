export class Color {
  static readonly RED = new Color(255, 0, 0);
  static readonly GREEN = new Color(0, 255, 0);
  static readonly BLUE = new Color(0, 0, 255);

  get isReddish() {
    return isPredominant(this.r, this.g, this.b);
  }

  get isBlueish() {
    return isPredominant(this.b, this.r, this.g);
  }

  get isPurpleish() {
    return (
      isPredominantOver(this.r, this.g) && isPredominantOver(this.b, this.g)
    );
  }

  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number = 1,
  ) {}

  toRgba() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  is(other: Color) {
    return (
      this.r === other.r &&
      this.g === other.g &&
      this.b === other.b &&
      this.a === other.a
    );
  }

  setTo(data: Uint8ClampedArray, index: number) {
    data[index] = this.r;
    data[index + 1] = this.g;
    data[index + 2] = this.b;
    data[index + 3] = this.a * 255;
  }
}

function isPredominantOver(x: number, a: number) {
  return x > 10 && x > a * 1.25;
}

function isPredominant(x: number, a: number, b: number) {
  return x > 10 && x > a * 1.25 && x > b * 1.25;
}
