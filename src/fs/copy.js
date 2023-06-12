//implement function that copies folder files files with all its content into folder files_copy at the same level (if files folder doesn't exists or files_copy has already been created Error with message FS operation failed must be thrown)

import {copyFile, mkdir, readdir} from 'node:fs/promises';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

    const filesDirPath = join(__dirname, 'files');
    const filesCopyDirPath = join(__dirname, 'files_copy')

    let copyExists = false;
    let filesToCopy;

    // check if files folder exists
    try {
      filesToCopy = await readdir(filesDirPath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }

    // check if files_copy folder exists
    try {
      await readdir(filesCopyDirPath);
      copyExists = true;
    } catch (e) {
      // if files_copy does not exist, create it and copy files
      if (e.code === 'ENOENT') {
        await mkdir(filesCopyDirPath);
        await readdir(filesDirPath);
        for (const file of filesToCopy) {
          const srcFile = join(filesDirPath, file);
          const destFile = join(filesCopyDirPath, file);
          await copyFile(srcFile, destFile);
        }
      }
    }

    // if files_copy exists throw an error
    if (copyExists) {
      throw new Error('FS operation failed');
    }

  }
;

await copy();
