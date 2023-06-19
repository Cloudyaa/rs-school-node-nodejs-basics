import {Transform} from "stream";

const transform = async () => {
  const reverseText = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split('').reverse().join('');
      this.push(reversedText);
      callback();
    }
  });

  process.stdin.pipe(reverseText).pipe(process.stdout);
};

await transform();
