import {createReadStream} from "fs";
import {getFilePath} from "../getFilePath.js";

const read = async () => {
  const filePath = getFilePath('fileToRead.txt', 'streams');
  const stream = createReadStream(filePath);
  for await (const chunk of stream) {
    process.stdout.write(chunk);
 }
};

await read();
