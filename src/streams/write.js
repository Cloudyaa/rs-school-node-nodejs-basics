import {createWriteStream} from 'fs';
import {getFilePath} from "../getFilePath.js";
const write = async () => {
  const filePath = getFilePath('fileToWrite.txt', 'streams');
  const stream = createWriteStream(filePath);
  process.stdin.pipe(stream);
};

await write();
