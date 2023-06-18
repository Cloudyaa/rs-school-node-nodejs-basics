import {filesDirPath} from "./filesDirPath.js";
import {join} from "path";
import {readFile} from "node:fs/promises";

const read = async () => {
  const filePath = join(filesDirPath, 'fileToRead.txt');

  try {
    const file = await readFile(filePath, 'utf8');
    console.log(file);
  } catch (e) {
    if(e.code === "ENOENT"){
      throw new Error('Fs operation failed');
    }
  }
};

await read();
