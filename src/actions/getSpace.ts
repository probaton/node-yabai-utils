import { summarizeSpaces } from '../helpers/util';
import Yabai from '../Yabai';

async function getSpace(idOrIndex: number) {
  const spaces = (await Yabai.query.getSpaces()).filter(space => space.id == idOrIndex || space.index == idOrIndex);
  return summarizeSpaces(spaces);
}

export default {
  command: 'get-space',
  func: getSpace,
};
