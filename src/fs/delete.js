import {dirname, join} from "path";
import {readFile, unlink} from "node:fs/promises";
import {fileURLToPath} from "url";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = join(__dirname, 'files','fileToRemove.txt');

  try {
    await readFile(filePath);
    await unlink(filePath);
  } catch (e) {
      throw new Error('FS operation failed');
  }
};

await remove();
