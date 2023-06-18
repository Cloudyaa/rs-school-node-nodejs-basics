import {createWriteStream, createReadStream} from "fs";
import {createGunzip} from "zlib";
import {getFilePath} from "../getFilePath.js";

const decompress = async () => {
  const compressedFile = getFilePath('archive.gz','zip');
  const decompressedFile = getFilePath('fileToCompress.txt', 'zip');

  const readStream = createReadStream(compressedFile);
  const writeStream = createWriteStream(decompressedFile);
  const gunzip = createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

};

await decompress();
