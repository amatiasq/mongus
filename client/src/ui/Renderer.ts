import { DeadBody } from '../../../shared/models/DeadBody';
import { Obstacle } from '../../../shared/models/Obstacle';
import { Orientation } from '../../../shared/Orientation';
import { chain } from '../../../shared/util';
import { getCenterOf, minus, Vector } from '../../../shared/Vector';
import { ClientPlayer } from '../entities/ClientPlayer';
import { GameState } from '../GameState';
import { Color } from './Color';
import { getColorPatch } from './getColorPatch';
import { Sprite } from './Sprite';
import { SpriteManager } from './SpriteManager';

type Canvas = HTMLCanvasElement;

export class Renderer {
  private readonly context = this.canvas.getContext('2d')!;
  private readonly sprites = new SpriteManager({
    player: 'assets/sprites/player.png',
    phantom: 'assets/sprites/phantom.png',
    body: 'assets/sprites/body.png',
    background: 'assets/map/Cafeteria-sharedassets0.assets-210.png',
  });

  private camera: Vector = { x: 0, y: 0 };

  get whenLoaded() {
    return this.sprites.whenLoaded;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get center() {
    return getCenterOf(this);
  }

  constructor(readonly canvas: Canvas) {
    this.renderObstacle = this.renderObstacle.bind(this);
    this.renderDeadBody = this.renderDeadBody.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
  }

  fullscreen() {
    const requestFullscreen = () => {
      this.canvas.parentElement!.requestFullscreen();
      document.removeEventListener('keydown', requestFullscreen);
      document.removeEventListener('mousedown', requestFullscreen);
    };

    document.addEventListener('keydown', requestFullscreen);
    document.addEventListener('mousedown', requestFullscreen);
  }

  fillPage() {
    const fullscreen = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };

    fullscreen();
    window.addEventListener('resize', fullscreen);
  }

  centerCameraAt({ x, y }: Vector) {
    this.camera = { x, y };
  }

  render({ players, entities, obstacles }: GameState) {
    const offset = chain(this.center, minus(this.camera));

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.translate(offset.x, offset.y);

    this.renderBackground();

    obstacles.forEach(this.renderObstacle);
    (entities as DeadBody[]).forEach(this.renderDeadBody);
    players.forEach(this.renderPlayer);

    this.context.restore();

    this.renderVisibilityRange();
  }

  private renderBackground() {
    const background = this.sprites.get('background');
    background.renderTo(this.context);
  }

  private renderObstacle({ x, y, width, height }: Obstacle) {
    this.context.strokeStyle = 'red';
    this.context.strokeRect(x, y, width, height);
  }

  private renderDeadBody(body: DeadBody) {
    const sprite = this.sprites
      .getColored('body', getColorPatch(body.color))
      .at(body.position);

    if (body.orientation === Orientation.Right) {
      sprite.flip();
    }

    sprite.renderTo(this.context);
  }

  private renderPlayer(player: ClientPlayer) {
    const baseSprite = player.isDead ? 'phantom' : 'player';
    const sprite = this.sprites
      .getColored(baseSprite, getColorPatch(player.color))
      .at(player.position);

    renderText(this.context, '18px Arial', player.color, player.name, {
      x: player.position.x,
      y: player.position.y - 15 + sprite.offset.y,
    });

    if (player.orientation === Orientation.Left) {
      sprite.flip();
    }

    this.context.save();

    if (player.isDead) {
      this.context.globalAlpha = 0.8;
    }

    sprite.renderTo(this.context);
    this.context.globalAlpha = 1;
    this.context.restore();
  }

  private renderVisibilityRange() {
    const { x, y } = this.center;
    const gradient = this.context.createRadialGradient(x, y, 100, x, y, 400);

    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'black');

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);
  }
}

function renderText(
  context: CanvasRenderingContext2D,
  font: string,
  hex: string,
  text: string,
  { x, y }: Vector,
) {
  const spaced = text.split('').join(String.fromCharCode(8202));

  context.save();

  context.font = font;
  context.textAlign = 'center';

  context.strokeStyle = 'black';
  context.lineWidth = 5;
  context.miterLimit = 2;
  context.strokeText(spaced, x, y);

  context.fillStyle = hex;
  context.fillText(spaced, x, y);

  context.restore();
}
