import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  const uniqKeysFromObjects = _.sortBy(_.union(key1, key2));
  const result = uniqKeysFromObjects.map((key) => {
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
        value1: obj1[key],
        value2: obj2[key],
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

export default getDiff;
