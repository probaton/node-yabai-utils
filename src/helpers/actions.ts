import fs from 'fs';

export function getActions(): NyuAction[] {
  const filePaths: string[] = [];

  function processDir(path) {
    fs.readdirSync(path).forEach(fileName => {
      const filePath = `${path}/${fileName}`;
      if (fs.statSync(filePath).isDirectory()) {
        processDir(filePath);
      }
      if (fileName.endsWith('.ts') || fileName.endsWith('.js')) {
        filePaths.push(filePath);
      }
    });
  }

  processDir(`${__dirname}/../actions`);
  return filePaths.map(path => require(path).default);
}

export interface NyuAction {
  command: string;
  func: (...args: any[]) => void;
}

