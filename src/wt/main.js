// main.js
import {Worker} from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numThreads = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker('./src/wt/worker.js');
    worker.postMessage(10 + i);
    workers.push(worker);
  }

  return new Promise((resolve) => {
    workers.forEach((worker, index) => {
      worker.on('message', (result) => {
        results[index] = { status: 'resolved', data: result };
        if (results.length === numThreads) {
          console.log(results);
          resolve();
        }
      });
      worker.on('error', () => {
        results[index] = { status: 'error', data: null };
        if (results.length === numThreads) {
          console.log(results);
          resolve();
        }
      });
    });
  });
};

await performCalculations();
