import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf8');

let actual;
let pathJson1;
let pathJson2;
let pathYaml1;
let pathYaml2;

beforeAll(() => {
  actual = readFile('actual.txt', 'utf8');
  pathJson1 = getFixturePath('file1.json');
  pathJson2 = getFixturePath('file2.json');
  pathYaml1 = getFixturePath('file1.yml');
  pathYaml2 = getFixturePath('file2.yml');
});

test('comparison two json file', () => {
  expect(genDiff(pathJson1, pathJson2)).toEqual(actual);
});

test('comparison two yaml file', () => {
  expect(genDiff(pathYaml1, pathYaml2)).toEqual(actual);
});
