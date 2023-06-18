import {join} from "path";
import {readFile, unlink} from "node:fs/promises";

const remove = async () => {
  const filePath = join('src/fs/files','fileToRemove.txt');

  try {
    await readFile(filePath);
    await unlink(filePath);
  } catch (e) {
      throw new Error('FS operation failed');
  }
};

await remove();
