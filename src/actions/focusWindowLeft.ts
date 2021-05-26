import Yabai from '../Yabai';

async function focusWindowLeft() {
  return Yabai.focusNextWindow(true);
}

export default {
  command: 'focus-window-left',
  func: focusWindowLeft,
};
