import { getKeys } from '../polyfill';
import { Color } from './Color';
import { Sprite } from './Sprite';

export type Image = HTMLImageElement;
export type Canvas = HTMLCanvasElement;

export type ColorPatch = Map<(pixel: Color) => boolean, Color>;

export class SpriteManager<TKey extends string> {
  private readonly cache: { [k: string]: Map<ColorPatch, Canvas> } = {};
  private readonly images: { [k: string]: Image } = {};
  readonly whenLoaded: Promise<void>;
  isLoaded = false;

  constructor(sprites: { [key in TKey]: string }) {
    const promises = getKeys(sprites).map(key =>
      loadImage(sprites[key]).then(img => (this.images[key] = img)),
    );

    this.whenLoaded = Promise.all(promises).then(x => {
      this.isLoaded = true;
    });
  }

  get(key: TKey): Sprite {
    return new Sprite(this.images[key]);
  }

  getColored(key: TKey, colors: ColorPatch): Sprite {
    let spriteCache = this.cache[key];

    if (!spriteCache) {
      spriteCache = this.cache[key] = new Map<ColorPatch, Canvas>();
    }

    if (spriteCache.has(colors)) {
      return new Sprite(spriteCache.get(colors)!);
    }

    const result = this.paint(this.images[key], colors);
    spriteCache.set(colors, result);
    return new Sprite(result);
  }

  private paint(img: Image, colors: ColorPatch) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    const { width, height } = img;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0);

    const image = context.getImageData(0, 0, width, height);
    const { data } = image;

    const patches = [...colors.entries()];
    const pLength = patches.length;

    for (let i = 0, len = data.length; i < len; i += 4) {
      const pixel = Color.fromImageData(data, i);

      for (let j = 0; j < pLength; j++) {
        const patch = patches[j];

        if (patch[0](pixel)) {
          patch[1].setToImageData(data, i, true);
          break;
        }
      }
    }

    context.putImageData(image, 0, 0);
    return canvas;
  }
}

function loadImage(src: string) {
  return new Promise<Image>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
