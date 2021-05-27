import { yabaiExec } from './helpers/exec';
import { IYabaiSpace, IYabaiWindow } from './IYabai';

export default class YabaiQuery {
  private windows: Promise<IYabaiWindow[]> | undefined;
  private spaces: Promise<IYabaiSpace[]> | undefined;

  constructor() {
    this.windows = undefined;
    this.spaces = undefined;
  }

  async query(query: string) {
    const results = await yabaiExec(`query ${query}`);
    try {
      return JSON.parse(results);
    } catch (e) {
      throw new Error(`Unable to parse query results:\n${results}\n\nError:\n${e}`);
    }
  }

  async getWindows(): Promise<IYabaiWindow[]> {
    if (this.windows) {
      return this.windows;
    }
    const windows = this.query('--windows');
    this.windows = windows;
    return windows;
  }

  async getWindow(windowId: number): Promise<IYabaiWindow | undefined> {
    return (await this.getWindows()).find(window => window.id == windowId);
  }

  async getCurrentWindow(): Promise<IYabaiWindow> {
    const currentWindow = (await this.getWindows()).find(window => window.focused == 1);
    if (!currentWindow) {
      throw new Error('No focused window found');
    }
    return currentWindow;
  }

  async getVisibleWindows(): Promise<IYabaiWindow[]> {
    return (await this.getWindows()).filter(window => window.visible == 1);
  }

  async getSpaces(): Promise<IYabaiSpace[]> {
    if (this.spaces) {
      return this.spaces;
    }
    const spaces = this.query('--spaces');
    this.spaces = spaces;
    return spaces;
  }

  async getSpace(spaceId: number): Promise<IYabaiSpace | undefined> {
    return (await this.getSpaces()).find(space => space.id == spaceId);
  }

  async getCurrentSpace(): Promise<IYabaiSpace> {
    const currentSpace = (await this.getSpaces()).find(space => space.focused == 1);
    if (!currentSpace) {
      throw new Error('No focused space found');
    }
    return currentSpace;
  }
}
