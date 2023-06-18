import {join} from "path";
import {readFile, unlink} from "node:fs/promises";
import {filesDirPath} from "./filesDirPath.js";

const remove = async () => {
  const filePath = join(filesDirPath,'fileToRemove.txt');

  try {
    await readFile(filePath);
    await unlink(filePath);
  } catch (e) {
      throw new Error('FS operation failed');
  }
};

await remove();
