import { emitter } from '@amatiasq/emitter';
import { chain } from '../../../shared/util';
import { minus, plus, Vector } from '../../../shared/Vector';
import { DragAction } from './DragAction';

export abstract class ResizableBox {
  position = { x: 0, y: 0 };

  protected el = this.createDom();

  protected emitChange = emitter<this>();
  onChange = this.emitChange.subscribe;

  protected emitPositionChange = emitter<this>();
  onPositionChange = this.emitPositionChange.subscribe;

  protected emitSizeChange = emitter<this>();
  onSizeChange = this.emitSizeChange.subscribe;

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
    this.emitPositionChange(this);
    this.emitChange(this);
  }

  protected setSize(size: Vector) {
    this.el.style.width = `${size.x}px`;
    this.el.style.height = `${size.y}px`;
    this.emitSizeChange(this);
    this.emitChange(this);
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
