import { chain } from '../../../shared/util';
import { minus, negate, plus, Vector } from '../../../shared/Vector';

class DragAction {
  private offset: ((y: Vector) => Vector) | null = null;

  isDragging = false;

  constructor(
    private readonly el: HTMLElement,
    private readonly onStart: (x: Vector) => (y: Vector) => Vector,
    private readonly onDrag: (x: Vector) => void,
  ) {
    el.addEventListener('mousedown', this.onMouseDown);
  }

  dispose() {
    this.el.removeEventListener('mousedown', this.onMouseDown);

    if (this.isDragging) {
      document.body.removeEventListener('mouseup', this.onMouseUp);
      document.body.removeEventListener('mousemove', this.onMouseMove);
    }
  }

  private readonly onMouseDown = this.stop<MouseEvent>(event => {
    this.isDragging = true;
    this.offset = this.onStart({ x: event.clientX, y: event.clientY });

    document.body.addEventListener('mouseup', this.onMouseUp);
    document.body.addEventListener('mousemove', this.onMouseMove);
  });

  private readonly onMouseUp = this.stop(event => {
    this.isDragging = false;
    document.body.removeEventListener('mouseup', this.onMouseUp);
    document.body.removeEventListener('mousemove', this.onMouseMove);
  });

  private readonly onMouseMove = this.stop<MouseEvent>(event => {
    const pos = { x: event.clientX, y: event.clientY };
    this.onDrag(this.offset ? this.offset(pos) : pos);
  });

  private stop<T extends Event>(handler: (event: T) => void) {
    return (event: T) => {
      event.stopPropagation();
      handler(event);
    };
  }
}

abstract class ResizableBox {
  position = { x: 0, y: 0 };

  protected el = this.createDom();

  constructor() {
    this.setPosition({ x: 200, y: 200 });
  }

  render() {
    document.body.appendChild(this.el);
  }

  protected setPosition(pos: Vector) {
    this.position = pos;
    this.el.style.top = `${pos.y}px`;
    this.el.style.left = `${pos.x}px`;
  }

  protected createDom() {
    const el = document.createElement('div');
    el.classList.add('obstacle');

    el.appendChild(this.createHandle());

    new DragAction(
      el,
      x => chain(this.position, minus(x), plus),
      x => this.setPosition(x),
    );

    return el;
  }

  protected createHandle() {
    const handle = document.createElement('div');
    handle.classList.add('handle');
    return handle;
  }
}

export class CircleObstacle extends ResizableBox {
  radius = 10;

  get size() {
    return { x: this.radius * 2, y: this.radius * 2 };
  }

  constructor() {
    super();
    this.setSize(200);
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
        const size = chain(pos, minus(this.position));
        const value = Math.max(size.x, size.y);
        this.setSize(value / 2);
      },
    );

    return handle;
  }

  private setSize(radius: number) {
    this.radius = radius;
    this.el.style.width = `${radius * 2}px`;
    this.el.style.height = `${radius * 2}px`;
  }
}

function stop<T extends Event>(x: (event: T) => void) {
  return (event: T) => {
    event.stopPropagation();
    x(event);
  };
}
