import Yabai from '../Yabai';

async function cycleDisplaySpace(direction: 'left' | 'right') {
  if (direction != 'left' && direction != 'right') {
    throw new Error('Valid options are <left> and <right>');
  }

  const currentSpace = await Yabai.query.getCurrentSpace();
  const spaces = (await Yabai.query.getSpaces()).filter(space => space.display == currentSpace.display && space.windows.length != 0);
  const sortedSpaces = spaces
    .sort((a, b) => (a.index < currentSpace.index ? a.index + spaces.length : a.index) - (b.index < currentSpace.index ? b.index + spaces.length : b.index))
    .slice(1);

  if (direction == 'left') {
    sortedSpaces.reverse();
  }

  if (!sortedSpaces[0]) {
    throw new Error('No other suitable spaces found for the current display');
  }

  return Yabai.focusSpace(sortedSpaces[0]);
}

export default {
  command: 'cycle-display-space',
  func: cycleDisplaySpace,
};
