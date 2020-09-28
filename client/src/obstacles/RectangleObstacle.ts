import { chain } from '../../../shared/util';
import { minus, negate, plus, Vector } from '../../../shared/Vector';
import { DragAction } from './DragAction';
import { ResizableBox } from './ResizableBox';

export class RectangleObstacle extends ResizableBox {
  size = { x: 0, y: 0 };

  constructor() {
    super();
    this.setSize({ x: 300, y: 200 });
  }

  protected createDom() {
    const el = super.createDom();
    el.classList.add('rectangle');
    return el;
  }

  protected createHandle() {
    const handle = super.createHandle();

    new DragAction(
      handle,
      x => chain(x, minus(this.size), minus(this.position), negate, plus),
      pos => this.setSize(minus(pos)(this.position)),
    );

    return handle;
  }

  protected setSize({ x, y }: Vector) {
    this.size = { x, y };
    super.setSize(this.size);
  }

  toJSON() {
    const { position, size } = this;
    return { position, size };
  }
}
