import promiseExec from './helpers/promiseExec';
import storeSpaceFocus from './helpers/storeContainerFocus';
import { IYabaiSpace, IYabaiWindow } from './IYabai';

class Yabai {
  public windows: Promise<IYabaiWindow[]>;

  constructor() {
    this.windows = this.getAllWindows();
  }

  async getAllWindows(): Promise<IYabaiWindow[]> {
    return (await this.query('--windows')) as IYabaiWindow[];
  }

  exec(command: string) {
    try {
      return promiseExec(`yabai -m ${command}`);
    } catch (e) {
      throw new Error(`Failed to execute <${command}>\n\n${e}`);
    }
  }

  async query(query: string) {
    const results = await this.exec(`query ${query}`);
    try {
      return JSON.parse(results);
    } catch (e) {
      throw new Error(`Unable to parse query results:\n${results}\n\nError:\n${e}`);
    }
  }

  async getVisibleWindows(): Promise<IYabaiWindow[]> {
    return (await this.windows).filter(window => window.visible == 1);
  }

  async getCurrentWindow(): Promise<IYabaiWindow> {
    const currentWindow = (await this.windows).find(window => window.focused == 1);
    if (!currentWindow) {
      throw new Error('No focused window found');
    }
    return currentWindow;
  }

  getCurrentSpace(): Promise<IYabaiSpace> {
    return this.query('--spaces --space');
  }

  async focusWindow(windowId: number) {
    storeSpaceFocus((await this.getCurrentSpace()).id, (await this.getCurrentWindow()).id);
    return this.exec(`window --focus ${windowId}`);
  }

  async focusDisplay(index: number) {
    return this.exec(`display --focus ${index}`);
  }
}

export default new Yabai();
