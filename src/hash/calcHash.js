import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {once} from 'events';
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const calculateHash = async () => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesDirPath = join(__dirname, 'files');
  const filePath = join(filesDirPath, 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');

  const streamToHash = createReadStream(filePath);

  streamToHash.on('readable', () => {
    const data = streamToHash.read();
    if (data) {
      hash.update(data);
    }
  });

  await once(streamToHash, 'end');
  console.log(hash.digest('hex'));
};

await calculateHash();
