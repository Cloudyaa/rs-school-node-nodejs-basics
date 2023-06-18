import path, {dirname} from "path";
import {release, version} from "os";
import {createServer} from "http";
import {fileURLToPath} from "url";
import "./files/c.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const random = Math.random();

export const unknownObject = random > 0.5
  ? await import('./files/a.json', {assert: {type: 'json'}})
  : await import('./files/b.json', {assert: {type: 'json'}});

const printLines = (string) => {
  return console.log(string
    .split('\n')
    .map(line => line.trimStart())
    .join('\n'));
}
printLines(`
    Release ${release()}
    Version ${version()}
    Path segment separator is "${path.sep}"
    Path to current file is ${__filename}
    Path to current directory is ${__dirname}`
);

export const myServer = createServer((req, res) => {
  res.end('Request accepted');
});

console.log(unknownObject);

const PORT = 3000;
myServer.listen(PORT, () => {

  printLines(`
    Server is listening on port ${PORT}
    To terminate it, use Ctrl+C combination`
  );

});
