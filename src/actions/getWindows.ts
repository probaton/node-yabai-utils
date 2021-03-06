import { summarizeWindows } from '../helpers/util';
import Yabai from '../Yabai';

async function getWindows() {
  return summarizeWindows((await Yabai.query.getWindows()));
}

export default {
  command: 'get-windows',
  func: getWindows,
};
