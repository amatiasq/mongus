import { Vector } from '../../../shared/Vector';

export class DragAction {
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
