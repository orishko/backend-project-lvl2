import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const iter = (tree, path = '') => {
  const toString = (node) => {
    const commonPath = path ? `${path}.${node.key}` : node.key;
    switch (node.status) {
      case 'nested':
        return iter(node.value, commonPath);
      case 'added':
        return `Property '${commonPath}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${commonPath}' was removed`;
      case 'changed':
        return `Property '${commonPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'unchanged':
        return false;
      default:
        throw new Error(`Unknown status ${node.status}`);
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
