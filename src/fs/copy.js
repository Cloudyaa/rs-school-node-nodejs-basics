
import {copyFile, mkdir, readdir} from 'node:fs/promises';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import {filesDirPath} from "./filesDirPath.js";

const copy = async () => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

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
