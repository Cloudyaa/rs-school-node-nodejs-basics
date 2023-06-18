import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import {once} from 'events';
import {getFilePath} from "../getFilePath.js";

const calculateHash = async () => {

  const filePath = getFilePath('fileToCalculateHashFor.txt', 'hash');

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
