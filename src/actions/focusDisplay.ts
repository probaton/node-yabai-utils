import Yabai from '../Yabai';

function focusDisplay(displayId: number) {
  if (!displayId) {
    throw new Error('Missing display ID');
  }
  return Yabai.focusDisplay(displayId);
}

export default {
  command: 'focus-display',
  func: focusDisplay,
};
