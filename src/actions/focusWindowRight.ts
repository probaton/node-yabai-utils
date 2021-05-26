import Yabai from '../Yabai';

async function focusWindowRight() {
  return Yabai.focusNextWindow();
}

export default {
  command: 'focus-window-right',
  func: focusWindowRight,
};
