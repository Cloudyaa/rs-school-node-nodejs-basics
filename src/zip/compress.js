import {createWriteStream, createReadStream} from "fs";
import {createGzip} from "zlib";
import {getFilePath} from "../getFilePath.js";

const compress = async () => {
  const fileToCompress = getFilePath('fileToCompress.txt','zip');
  const compressedFile = getFilePath('archive.gz', 'zip');

  const readStream = createReadStream(fileToCompress);
  const writeStream = createWriteStream(compressedFile);
  const gzip = createGzip();

  readStream.pipe(gzip).pipe(writeStream);
};

await compress();
