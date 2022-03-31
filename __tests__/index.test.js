import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/getDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let actualFlat;
let actualNested;
let pathJson1;
let pathJson2;
let pathYaml1;
let pathYaml2;
let pathNested1;
let pathNested2;

beforeAll(() => {
  actualFlat = readFile('actual_flat.txt', 'utf8');
  actualNested = readFile('actual_nested.txt', 'utf8');
  pathJson1 = getFixturePath('file1.json');
  pathJson2 = getFixturePath('file2.json');
  pathYaml1 = getFixturePath('file1.yml');
  pathYaml2 = getFixturePath('file2.yml');
  pathNested1 = getFixturePath('nested1.json');
  pathNested2 = getFixturePath('nested2.json');
});

test('comparison two flat json file', () => {
  expect(genDiff(pathJson1, pathJson2)).toEqual(actualFlat);
});

test('comparison two flat yaml file', () => {
  expect(genDiff(pathYaml1, pathYaml2)).toEqual(actualFlat);
});

test('comparison two nested json file', () => {
  expect(genDiff(pathNested1, pathNested2)).toEqual(actualNested);
});
