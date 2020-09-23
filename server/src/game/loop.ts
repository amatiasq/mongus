/// <reference path="./node-gameloop.d.ts" />
import { setGameLoop } from 'node-gameloop';

const FRAMES = 30;
let frameCount = 0;

export function startLoop(handler: (delta: number) => void) {
  setInterval(() => {
    console.log(`Averag FPS in 5 seconds: ${frameCount / 5}`);
    frameCount = 0;
  }, 5000);

  return setGameLoop((delta: number) => {
    frameCount++;
    handler(delta);
  });
}
