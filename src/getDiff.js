import fileCompare from './getTree.js';
import readFile from './parsers.js';
import formatData from './formaters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = readFile(filePath1);
  const dataFile2 = readFile(filePath2);
  const diffTree = fileCompare(dataFile1, dataFile2);

  return formatData(diffTree, format);
};

export default genDiff;
