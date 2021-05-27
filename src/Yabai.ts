import { yabaiExec } from './helpers/exec';
import { storeSpaceFocus, getSpaceFocus } from './helpers/storeContainerFocus';
import { IYabaiSpace } from './IYabai';
import YabaiQuery from './YabaiQuery';

class Yabai {
  query: YabaiQuery;

  constructor() {
    this.query = new YabaiQuery();
  }

  async focusWindow(windowId: number) {
    storeSpaceFocus((await this.query.getCurrentSpace()).id, (await this.query.getCurrentWindow()).id);
    return yabaiExec(`window --focus ${windowId}`);
  }

  async focusDisplay(displayIndex: number) {
    const displaySpace = (await this.query.getSpaces()).find(space => space.display == displayIndex && space.visible == 1);
    if (!displaySpace) {
      throw new Error(`No visible space found for display ${displayIndex}`);
    }
    return this.focusSpace(displaySpace);
  }

  async focusSpace(space: IYabaiSpace) {
    const storedWindowId = getSpaceFocus(space.id);
    const windowId = (storedWindowId && (await this.query.getWindow(storedWindowId))?.space == space.index)
      ? storedWindowId
      : (await this.query.getWindows()).find(window => window.space == space.index)?.id;

    if (!windowId) {
      throw new Error(`No window to focus on space ${space.id}`);
    }

    return this.focusWindow(windowId);
  }
}

export default new Yabai();
