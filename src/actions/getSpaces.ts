import Yabai from '../Yabai';
import { summarizeSpaces } from '../helpers/util';

async function getSpaces() {
  return summarizeSpaces(await Yabai.query.getSpaces());
}

export default {
  command: 'get-spaces',
  func: getSpaces,
};
