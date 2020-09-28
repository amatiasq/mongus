import { chain } from '../../../shared/util';
import { minus, negate, plus } from '../../../shared/Vector';
import { DragAction } from './DragAction';
import { ResizableBox } from './ResizableBox';

export class CircleObstacle extends ResizableBox {
  radius = 10;

  get size() {
    return { x: this.radius * 2, y: this.radius * 2 };
  }

  constructor() {
    super();
    this.setRadius(200);
  }

  protected createDom() {
    const el = super.createDom();
    el.classList.add('circle');
    return el;
  }

  protected createHandle() {
    const handle = super.createHandle();

    new DragAction(
      handle,
      x => chain(x, minus(this.size), minus(this.position), negate, plus),
      pos => {
        const size = minus(pos)(this.position);
        const value = Math.max(size.x, size.y);
        this.setRadius(value / 2);
      },
    );

    return handle;
  }

  private setRadius(radius: number) {
    this.radius = radius;
    super.setSize(this.size);
  }
}
