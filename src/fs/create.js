import {writeFile, readFile} from 'node:fs/promises';
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = join(__dirname,'files','fresh.txt');
  let isCreated = false;
  try {
    await readFile(filePath);
    isCreated = true;
  } catch (e) {
    if(e.code === 'ENOENT'){
      await writeFile(filePath, 'I am fresh and young');
    }
  }

  if(isCreated){
    throw new Error('FS operation failed');
  }

};

await create();
