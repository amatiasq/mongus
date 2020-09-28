import {
  existsSync,
  readFile as readFileCps,
  writeFile as writeFileCps,
} from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const writeFile = promisify(writeFileCps);
const readFile = promisify(readFileCps);
const data = join(__dirname, './obstacles-data.json');

if (!existsSync(data)) {
  writeFile(data, '[]');
}

export async function getObstacles() {
  const result = await readFile(data);
  return JSON.parse(result.toString());
}

export function setObstacles(obstacles: any) {
  return writeFile(data, JSON.stringify(obstacles));
}
