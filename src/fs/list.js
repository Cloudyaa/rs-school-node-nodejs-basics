import {fileURLToPath} from "url";
import {dirname, join, parse} from "path";
import {readdir} from "node:fs/promises";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filesDirPath = join(__dirname, 'files');

  try {
    const files = await readdir(filesDirPath);
    for (const file of files) {
      const {name} = parse(file);
      console.log(name);
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      throw new Error('Fs operation failed');
    }
  }
}

await list();
