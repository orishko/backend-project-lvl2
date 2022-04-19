import path from 'path';
import { readFileSync } from 'fs';
import fileCompare from './getTree.js';
import getParsedData from './parsers.js';
import formatData from './formaters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath).slice(1);

const getDataFromFile = (filepath) => {
  const normalizeFilePath = getFullPath(filepath);
  return readFileSync(normalizeFilePath, 'utf8');
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = getParsedData(getExtension(filePath1), getDataFromFile(filePath1));
  const dataFile2 = getParsedData(getExtension(filePath2), getDataFromFile(filePath2));
  const diffTree = fileCompare(dataFile1, dataFile2);

  return formatData(diffTree, format);
};

export default genDiff;
