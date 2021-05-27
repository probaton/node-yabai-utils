import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export function storeSpaceFocus(spaceId: number, windowId: number) {
  const dbPath = './db/';
  !existsSync(dbPath) && mkdirSync(dbPath);

  return writeFileSync(`${dbPath}/${spaceId}`, windowId.toString());
}

export function getSpaceFocus(spaceId: number): number | undefined {
  const path = `./db/${spaceId}`;
  if (existsSync(path)) {
    return parseInt(readFileSync(path, 'utf-8'));
  }
}
