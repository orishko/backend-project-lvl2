import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatData = (data, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`Unknown format: ${formatType}!`);
  }
};
export default formatData;
