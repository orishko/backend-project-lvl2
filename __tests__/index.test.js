import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/getDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const cases = [
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'plain.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'plain.txt'],
];

test.each(cases)('%# - Compare  %s and %s using %s formatter', (file1, file2, formatter, expected) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  const expectedResult = readFile(expected);

  expect(genDiff(path1, path2, formatter)).toBe(expectedResult);
});
