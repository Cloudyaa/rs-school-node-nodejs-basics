import {fileURLToPath} from "url";
import {dirname, join} from "path";

export const getFilePath = (fileName, subDir)  => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filesDirPath = join(__dirname, subDir, 'files');
  return join(filesDirPath, fileName);
}
