import _ from 'lodash';

const fileCompare = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  const uniqKeysFromObjects = _.sortBy(_.union(key1, key2));
  const result = uniqKeysFromObjects.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        children: fileCompare(obj1[key], obj2[key]),
        status: 'nested',
      };
    }
    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        status: 'added',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        status: 'removed',
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
    }
    return {
      key,
      value: obj1[key],
      status: 'unchanged',
    };
  });

  return result;
};

export default fileCompare;
