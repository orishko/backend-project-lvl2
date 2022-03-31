import _ from 'lodash';

const getKey = (obj) => obj.key;
const getValue = (obj) => obj.value;
const getStatus = (obj) => obj.status;
const indent = (depth, spaceCount = 4, currentIndent = ' ') => {
  const indentSize = depth * spaceCount - 2;
  return currentIndent.repeat(indentSize);
};

const stylish = (data) => {
  const getDataFromObject = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const lines = Object.entries(currentValue).map(([key, val]) => `  ${indent(currentDepth)}${key}: ${getDataFromObject(val, currentDepth + 1)}`);

    return ['{', ...lines, `${indent(currentDepth).slice(2)}}`].join('\n');
  };

  const makeResultString = (arr, depth) => {
    const currentIndent = indent(depth);
    const bracketIndent = currentIndent.slice(2);

    const result = arr.map((item) => {
      const key = getKey(item);
      const value = getValue(item);
      const status = getStatus(item);
      switch (status) {
        case 'nested':
          return `${indent(depth)}  ${key}: ${makeResultString(value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${getDataFromObject(value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${getDataFromObject(value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${getDataFromObject(value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${getDataFromObject(value.first, depth + 1)}\n${currentIndent}+ ${key}: ${getDataFromObject(value.second, depth + 1)}`;
        default:
          throw new Error(`${status} - Unexpected status`);
      }
    });

    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return makeResultString(data, 1);
};

export default stylish;
