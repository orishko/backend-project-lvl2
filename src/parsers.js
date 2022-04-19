import yaml from 'js-yaml';

const getParsedData = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`${format} extension is not supported. Available json or yaml`);
  }
};

export default getParsedData;
