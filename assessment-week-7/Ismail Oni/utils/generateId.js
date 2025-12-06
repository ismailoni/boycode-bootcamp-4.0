const generateId = (data) => {
  if (!Array.isArray(data)) {
    throw new TypeError('generateId expects an array');
  }

  if (data.length === 0) {
    return 1;
  }

  const validIds = data
    .map(item => Number(item && item.id))
    .filter(id => Number.isFinite(id) && id > 0);

  const maxId = validIds.length > 0 ? Math.max(...validIds) : 0;
  return maxId + 1;
};

export default generateId;