import { exec as _exec } from 'child_process';

export default function promiseExec(command: string) {
  return new Promise<string>((resolve, reject) => {
    _exec(command, (error, stdout, stderr) => {
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
