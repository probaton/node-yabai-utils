import promiseExec from './helpers/promiseExec';
import { storeSpaceFocus, getSpaceFocus } from './helpers/storeContainerFocus';
import { IYabaiSpace, IYabaiWindow } from './IYabai';

class Yabai {
  private windows: Promise<IYabaiWindow[]> | undefined;
  private spaces: Promise<IYabaiSpace[]> | undefined;

  constructor() {
    this.windows = undefined;
    this.spaces = undefined;
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

  async getWindows(): Promise<IYabaiWindow[]> {
    if (this.windows) {
      return this.windows;
    }
    const windows = this.query('--windows');
    this.windows = windows;
    return windows;
  }

  async getSpaces(): Promise<IYabaiSpace[]> {
    if (this.spaces) {
      return this.spaces;
    }
    const spaces = this.query('--spaces');
    this.spaces = spaces;
    return spaces;
  }

  async getVisibleWindows(): Promise<IYabaiWindow[]> {
    return (await this.getWindows()).filter(window => window.visible == 1);
  }

  async getWindow(windowId: number): Promise<IYabaiWindow | undefined> {
    return (await this.getWindows()).find(window => window.id == windowId);
  }

  async getSpace(spaceId: number): Promise<IYabaiSpace | undefined> {
    return (await this.getSpaces()).find(space => space.id == spaceId);
  }

  async getCurrentWindow(): Promise<IYabaiWindow> {
    const currentWindow = (await this.getWindows()).find(window => window.focused == 1);
    if (!currentWindow) {
      throw new Error('No focused window found');
    }
    return currentWindow;
  }

  async getCurrentSpace(): Promise<IYabaiSpace> {
    const currentSpace = (await this.getSpaces()).find(space => space.focused == 1);
    if (!currentSpace) {
      throw new Error('No focuses space found');
    }
    return currentSpace;
  }

  async focusWindow(windowId: number) {
    storeSpaceFocus((await this.getCurrentSpace()).id, (await this.getCurrentWindow()).id);
    return this.exec(`window --focus ${windowId}`);
  }

  async focusDisplay(displayIndex: number) {
    const displaySpace = (await this.getSpaces()).find(space => space.display == displayIndex && space.visible == 1);
    if (!displaySpace) {
      throw new Error(`No visible space found for display ${displayIndex}`);
    }
    return this.focusSpace(displaySpace);
  }

  async focusSpace(space: IYabaiSpace) {
    const storedWindowId = getSpaceFocus(space.id);
    const windowId = (storedWindowId && (await this.getWindow(storedWindowId))?.space == space.index)
      ? storedWindowId
      : (await this.getWindows()).find(window => window.space == space.index)?.id;

    if (!windowId) {
      throw new Error(`No window to focus on space ${space.id}`);
    }

    return this.focusWindow(windowId);
  }
}

export default new Yabai();
