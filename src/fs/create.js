import {writeFile, readFile} from 'node:fs/promises';
import {join} from 'path';
import {filesDirPath} from "./filesDirPath.js";

const create = async () => {
  const filePath = join(filesDirPath,'fresh.txt');
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
