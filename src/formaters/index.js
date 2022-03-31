import stylish from './stylish.js';
import plain from './plain.js';

const formatData = (data, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown format: ${formatType}!`);
  }
};
export default formatData;
