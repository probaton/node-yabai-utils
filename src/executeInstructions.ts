import { getActions, NyuAction } from './helpers/actions';

export default async function executeInstructions(command: string) {
  const actions = getActions();
  if (!command) {
    throw new Error(`Available commands are ${enumerateCommands(actions)}`);
  }

  const action = actions.find(action => action.command == command);
  if (!action) {
    throw new Error(`<${command}> is not a valid command. Available options are${enumerateCommands(actions)}`);
  }

  return await action.func();
}

function enumerateCommands(actions: NyuAction[]) {
  return actions
    .map(action => `\n- ${action.command}`)
    .sort()
    .reduce((aggregate, action) => `${aggregate}${action}`);
}
