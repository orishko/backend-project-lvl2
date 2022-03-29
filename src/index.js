import getDifference from './getdifference.js';
import readFile from './parsers.js';

const getKey = (obj) => obj.key;
const getValue = (obj) => obj.value;

const genDiff = (filePath1, filePath2) => {
  const obj1 = readFile(filePath1);
  const obj2 = readFile(filePath2);
  const result = getDifference(obj1, obj2);
  const makeResultString = result.map((data) => {
    const key = getKey(data);
    const value = getValue(data);
    switch (data.status) {
      case 'unchanged':
        return `    ${key}: ${value}`;
      case 'removed':
        return `  - ${key}: ${value}`;
      case 'added':
        return `  + ${key}: ${value}`;
      case 'changed':
        return `  - ${key}: ${value[0]}\n  + ${key}: ${value[1]}`;
      default:
        throw new Error(`${data.status} - Unexpected status`);
    }
  });

  return ['{', ...makeResultString, '}'].join('\n');
};

export default genDiff;
