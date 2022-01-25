import { readFileSync } from 'fs';
import path from 'path';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
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
