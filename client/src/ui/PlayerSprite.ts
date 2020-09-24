import { Color } from './Color';

export class PlayerSprite {
  private readonly template = new Image();
  private readonly colors = new Map<string, HTMLCanvasElement>();
  private readonly flip: boolean;
  isReady = false;

  get width() {
    return this.template.width;
  }

  get height() {
    return this.template.height;
  }

  constructor(src: string, { flip = false }: { flip?: boolean } = {}) {
    this.template.src = src;
    this.template.onload = () => (this.isReady = true);
    this.flip = flip;
  }

  getColor(color: Color) {
    if (!this.isReady) {
      return this.template;
    }

    const hash = color.rgb;

    if (this.colors.has(hash)) {
      return this.colors.get(hash)!;
    }

    const result = this.paintTemplate(color);
    this.colors.set(hash, result);
    return result;
  }

  private paintTemplate(color: Color) {
    const dark = color.shade(0.5);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    const { width, height } = this.template;

    if (this.flip) {
      context.scale(-1, 1);
    }

    canvas.width = width;
    canvas.height = height;
    context.drawImage(this.template, 0, 0);

    const image = context.getImageData(0, 0, width, height);
    const { data } = image;

    for (let i = 0, len = data.length; i < len; i += 4) {
      const pixel = Color.fromImageData(data, i);

      if (pixel.isReddish) {
        color.setToImageData(data, i, true);
      } else if (pixel.isBlueish) {
        dark.setToImageData(data, i, true);
      }
    }

    context.putImageData(image, 0, 0);
    return canvas;
  }
}
