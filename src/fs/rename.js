import {dirname, join} from "path";
import fs, {readFile} from "node:fs/promises";
import {fileURLToPath} from "url";

const rename = async () => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(dirname(__filename), 'files');

  const wrongFilePath = join(__dirname,'wrongFilename.txt');
  const properFilename = join(__dirname,'properFilename.md');
  let properExists = false;

  // check if wrongFile exists
  try {
    await readFile(wrongFilePath);
  } catch (e){
    if(e.code !== "ENOENT"){
      throw new Error('FS operation failed');
    }
  }

  // check if properFile exists
  try {
    await readFile(properFilename);
    properExists = true;
  } catch (e) {
    // If properFile doesn't exist, rename wrongFilename to properFilename
    if(e.code === 'ENOENT'){
      await fs.rename(wrongFilePath, properFilename);
    }
  }

  // throw error if properFile exists already
  if(properExists){
    throw new Error('FS operation failed');
  }

};

await rename();
