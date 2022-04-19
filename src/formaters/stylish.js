import _ from 'lodash';

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
      switch (item.status) {
        case 'nested':
          return `${indent(depth)}  ${item.key}: ${makeResultString(item.value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${item.key}: ${getDataFromObject(item.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${item.key}: ${getDataFromObject(item.value, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${item.key}: ${getDataFromObject(item.value, depth + 1)}`;
        case 'changed':
          return `${currentIndent}- ${item.key}: ${getDataFromObject(item.oldValue, depth + 1)}\n${currentIndent}+ ${item.key}: ${getDataFromObject(item.newValue, depth + 1)}`;
        default:
          throw new Error(`${item.status} - Unexpected status`);
      }
    });

    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return makeResultString(data, 1);
};

export default stylish;
