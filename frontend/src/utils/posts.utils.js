import moment from 'moment';

export const arraySort = (array, sort) => {
  return [...array].sort((a, b) => {
    if (sort.param === 'date') {
      return sort.ascending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return sort.ascending
      ? a[sort.param] - b[sort.param]
      : b[sort.param] - a[sort.param];
  });
};

export const arrayFilter = (array, filter) => {
  return [...array].filter((post) => {
    if (filter === 'All time') return post;
    return moment().isSame(moment(post.createdAt), filter.toLowerCase());
  });
};
