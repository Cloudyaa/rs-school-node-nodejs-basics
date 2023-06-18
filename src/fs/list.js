import {parse} from "path";
import {readdir} from "node:fs/promises";
import {filesDirPath} from "./filesDirPath.js";

const list = async () => {
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
