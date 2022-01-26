import getDifference from './getdifference.js';
import { readFile } from './filehendler.js';

const genDiff = (filePath1, filePath2) => {
  const obj1 = readFile(filePath1);
  const obj2 = readFile(filePath2);
  const result = getDifference(obj1, obj2);
  const makeResultString = result.reduce((acc, data) => {
    if (data.status === 'unchanged') acc += `  ${data.key}: ${data.value}\n`;
    if (data.status === 'removed') acc += `- ${data.key}: ${data.value}\n`;
    if (data.status === 'added') acc += `+ ${data.key}: ${data.value}\n`;
    if (data.status === 'changed') acc += `- ${data.key}: ${data.value1} \n+ ${data.key}: ${data.value2}\n`;
    return acc;
  }, '');

  const addBrackets = (str) => `{\n${str}}`;

  return addBrackets(makeResultString);
};

export default genDiff;
