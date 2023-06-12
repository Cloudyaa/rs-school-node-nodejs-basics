import {writeFile, readFile} from 'node:fs/promises';
import {join} from 'path';

const create = async () => {
  const filePath = join('files','fresh.txt');
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
