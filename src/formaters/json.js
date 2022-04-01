export default (data = []) => (data.length ? JSON.stringify(data, null, 2) : '');
