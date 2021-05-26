import promiseExec from './helpers/promiseExec';
import { IYabaiWindow } from './IYabai';

function exec(command: string) {
  return promiseExec(`yabai -m ${command}`);
}

function query(query: string) {
  return exec(`query ${query}`);
}

async function getAllWindows(): Promise<IYabaiWindow[]> {
  return JSON.parse(await query('--windows')) as IYabaiWindow[];
}

async function getVisibleWindows(): Promise<IYabaiWindow[]> {
  const allWindows = await getAllWindows();
  return allWindows.filter(window => window.visible == 1);
}

async function getCurrentWindow(windowScope?: IYabaiWindow[]): Promise<IYabaiWindow> {
  const windows = windowScope || await getAllWindows();
  const currentWindow = windows.find(window => window.focused == 1);
  if (!currentWindow) {
    throw new Error('No focused window found');
  }
  return currentWindow;
}

async function focusWindow(windowId: number) {
  return exec(`window --focus ${windowId}`);
}

async function focusNextWindow(reverse = false) {
  const unsortedWindows = await getVisibleWindows();
  const windows = unsortedWindows.sort((a, b) => a.frame.x == b.frame.x ? a.frame.y - b.frame.y : a.frame.x - b.frame.x);
  if (reverse) {
    windows.reverse();
  }

  const currentWindow = await getCurrentWindow(windows);
  const nextWindowIndex = windows.map(w => w.id).indexOf(currentWindow.id) + 1;
  if (windows.length <= nextWindowIndex) {
    return 'No windows found in the required direction';
  }

  return focusWindow(windows[nextWindowIndex].id);
}

export default {
  exec,
  query,
  getAllWindows,
  getVisibleWindows,
  focusNextWindow,
};
