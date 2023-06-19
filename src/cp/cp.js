import {spawn} from "child_process";

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', ['src/cp/files/script.js', ...args]);

  childProcess.stdin.on('data', (data) => {
    const input = data.toString();
    process.stdin.write(input);
  });

  childProcess.stdout.on('data', (data) => {
    const output = data.toString();
    process.stdout.write(output);
  });

  childProcess.stderr.on('data', (data) => {
    const error = data.toString();
    process.stderr.write(`Error: ${error}`);
  });

  childProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Child process exited successfully');
      process.exit(0);
    } else {
      console.error(`Child process exited with code ${code}`);
      process.exit(1);
    }
  });
};

await spawnChildProcess([4, 'arg1', 6, 'arg2']);
