import { existsSync, mkdirSync, writeFileSync } from 'fs';

export default function storeSpaceFocus(spaceId: number, windowId: number) {
  const dbPath = './db/';
  !existsSync(dbPath) && mkdirSync(dbPath);

  return writeFileSync(`${dbPath}/${spaceId}`, windowId.toString());
}
