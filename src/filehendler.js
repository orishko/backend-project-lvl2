import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFullPath = (filepath) => path.resolve(__dirname, '..', '__fixtures__', filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => readFileSync(filepath, 'utf8');

const readFile = (filepath) => {
  const normalizeFilePath = getFullPath(filepath);
  const format = getFormat(normalizeFilePath);
  if (format !== 'json') throw Error('Wrong file format');

  const rawData = getData(normalizeFilePath);
  const obj = JSON.parse(rawData);
  return obj;
};

export { readFile, getFormat };
