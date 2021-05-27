import Yabai from '../Yabai';

async function focusNextWindow(direction: 'left' | 'right') {
  if (direction != 'left' && direction != 'right') {
    throw new Error('Valid options are <left> and <right>');
  }

  const unsortedWindows = await Yabai.query.getVisibleWindows();
  const windows = unsortedWindows.sort((a, b) => a.frame.x == b.frame.x ? a.frame.y - b.frame.y : a.frame.x - b.frame.x);
  if (direction == 'left') {
    windows.reverse();
  }

  const currentWindow = await Yabai.query.getCurrentWindow();
  const nextWindowIndex = windows.map(w => w.id).indexOf(currentWindow.id) + 1;
  if (windows.length <= nextWindowIndex) {
    return 'No windows found in the required direction';
  }

  return Yabai.focusWindow(windows[nextWindowIndex].id);
}

export default {
  command: 'focus-next-window',
  func: focusNextWindow,
};
