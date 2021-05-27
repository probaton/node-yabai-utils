import { summarizeWindows } from '../helpers/util';
import Yabai from '../Yabai';

async function getWindow(id: number) {
  const window = await Yabai.query.getWindow(id);
  if (!window) {
    throw new Error(`Cannot find window with id ${id}`);
  }
  return summarizeWindows([window]);
}

export default {
  command: 'get-window',
  func: getWindow,
};
