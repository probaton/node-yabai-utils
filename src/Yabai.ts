import promiseExec from './helpers/promiseExec';
import { IYabaiWindow } from './IYabai';

function exec(command: string) {
  try {
    return promiseExec(`yabai -m ${command}`);
  } catch (e) {
    throw new Error(`Failed to execute <${command}>\n\n${e}`);
  }
}

async function query(query: string) {
  const results = await exec(`query ${query}`);
  try {
    return JSON.parse(results);
  } catch (e) {
    throw new Error(`Unable to parse query results:\n${results}\n\nError:\n${e}`);
  }
}

async function getAllWindows(): Promise<IYabaiWindow[]> {
  return (await query('--windows')) as IYabaiWindow[];
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

async function focusDisplay(index: number) {
  return exec(`display --focus ${index}`);
}

export default {
  exec,
  query,
  getAllWindows,
  getCurrentWindow,
  getVisibleWindows,
  focusDisplay,
  focusWindow,
};
