#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/getDiff.js';

const program = new Command();

program
  .usage('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .action((filepath1, filepath2) => {
    // eslint-disable-next-line no-console
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });
program.parse();
