#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .usage('[options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  
program
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')

program.parse();