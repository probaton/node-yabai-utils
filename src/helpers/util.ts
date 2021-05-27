import { IYabaiSpace, IYabaiWindow } from '../IYabai';

function toLength(toLengthen: string | number | number[], requiredLength: number): string {
  let str = toLengthen.toString();
  if (str.length > requiredLength) {
    return str.substring(0, requiredLength);
  }
  while (str.length < requiredLength) {
    str += ' ';
  }
  return str;
}

export function summarizeWindows(windows: IYabaiWindow[]): string {
  const header = 'ID     D  S  Title\n------------------';
  const table = windows
    .map(window => `${toLength(window.id, 7)}${toLength(window.display, 3)}${toLength(window.space, 3)}${toLength(window.title, 80)}`)
    .reduce((aggregate, winString) => `${aggregate}\n${winString}`);

  return `${header}\n${table}`;
}

export function summarizeSpaces(spaces: IYabaiSpace[]): string {
  const header = 'ID     I  D  Windows\n--------------------';
  const table = spaces
    .map(space => `${toLength(space.id, 7)}${toLength(space.index, 3)}${toLength(space.display, 3)}${toLength(space.windows, 80)}`)
    .reduce((aggregate, winString) => `${aggregate}\n${winString}`);

  return `${header}\n${table}`;
}
