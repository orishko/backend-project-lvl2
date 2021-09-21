import { readFileSync } from 'fs';
import _ from 'lodash';

const pathToFile1 = 'file1.json';
const pathToFile2 = 'file2.json';

const getFormat = (path) => _.last(path.split('.'));

const getData = (filepath) => readFileSync(filepath);

const readFile = (path) => {
  const format = getFormat(path);
  if (format != 'json') throw Error('Wrong file format');

  const rawData = getData(path);
  const obj = JSON.parse(rawData);
  return obj;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);

  let result = '\n}';
  const entries = Object.entries(obj1);
  for (const [key, value] of entries) {
    if (_.has(obj2, key)) {
      if (value === obj2[key]) {
        result +=`\n    ${key}: ${value}`;
      } else {
        result +=`\n  - ${key}: ${value}`;
        result +=`\n  + ${key}: ${obj2[key]}`;
      }
    } else {
      result +=`\n  - ${key}: ${value}`;
    }
  }
  const entries2 = Object.entries(obj2);

  for (const [key, value] of entries2) {
    if (!_.has(obj1, key)) {
      result +=`\n  + ${key}: ${value}`;
    }
  }

  result +=`\n}\n`
  
  return result;

};

export { genDiff };
//console.log(process.cwd());