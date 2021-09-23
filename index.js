import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const normalizePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => readFileSync(filepath, 'utf8');

const readFile = (filepath) => {
  const normalizeFilePath = normalizePath(filepath);
  const format = getFormat(normalizeFilePath);
  if (format !== 'json') throw Error('Wrong file format');

  const rawData = getData(normalizePath(normalizeFilePath));
  const obj = JSON.parse(rawData);
  return obj;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);

  let result = '\n}';
  const entries = Object.entries(obj1);
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries) {
    if (_.has(obj2, key)) {
      if (value === obj2[key]) {
        result += `\n    ${key}: ${value}`;
      } else {
        result += `\n  - ${key}: ${value}`;
        result += `\n  + ${key}: ${obj2[key]}`;
      }
    } else {
      result += `\n  - ${key}: ${value}`;
    }
  }
  const entries2 = Object.entries(obj2);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of entries2) {
    if (!_.has(obj1, key)) {
      result += `\n  + ${key}: ${value}`;
    }
  }

  result += '\n}\n';

  return result;
};

export default genDiff;
