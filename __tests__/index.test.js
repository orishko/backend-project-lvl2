import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let actual;
let path1;
let path2;

beforeAll(() => {
  actual = readFile('actual.txt', 'utf8');
  path1 = getFixturePath('file1.json');
  path2 = getFixturePath('file2.json');
});

test('comparison two file', () => {
  expect(genDiff(path1, path2)).toEqual(actual);
});
