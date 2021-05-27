import { exec } from 'child_process';

export function promiseExec(command: string) {
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

export function yabaiExec(command: string) {
  try {
    return promiseExec(`yabai -m ${command}`);
  } catch (e) {
    throw new Error(`Failed to execute <${command}>\n\n${e}`);
  }
}
