import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const iter = (tree, path = '') => {
  const toString = ({ key, value, status }) => {
    const commonPath = path ? `${path}.${key}` : key;
    switch (status) {
      case 'nested':
        return iter(value, commonPath);
      case 'added':
        return `Property '${commonPath}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${commonPath}' was removed`;
      case 'changed':
        return `Property '${commonPath}' was updated. From ${stringify(value.first)} to ${stringify(value.second)}`;
      case 'unchanged':
        return false;
      default:
        throw new Error(`Unknown status ${status}`);
    }
  };
  return tree.flatMap(toString);
};

const plain = (data) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  iter(data)
    .filter((item) => item)
    .join('\n');

export default plain;
