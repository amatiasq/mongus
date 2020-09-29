import { chain } from '../../../shared/util';
import { getCenterOf, negate, Vector } from '../../../shared/Vector';
import { Image, Canvas } from './SpriteManager';

export class Sprite {
  readonly offset = chain(getCenterOf(this.source), negate);
  private position: Vector | null = null;
  isFlipped = false;

  get width() {
    return this.source.width;
  }

  get height() {
    return this.source.height;
  }

  constructor(private readonly source: Image | Canvas) {}

  flip() {
    this.isFlipped = !this.isFlipped;
    return this;
  }

  at(pos: Vector) {
    this.position = pos;
    return this;
  }

  renderTo(context: CanvasRenderingContext2D) {
    context.save();

    if (this.position) {
      context.translate(this.position.x, this.position.y);
    }

    if (this.isFlipped) {
      context.scale(-1, 1);
    }

    context.drawImage(this.source, this.offset.x, this.offset.y);
    context.restore();
  }
}
