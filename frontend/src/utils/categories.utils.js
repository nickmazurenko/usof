/* eslint-disable import/prefer-default-export */
export const arraySort = (array, sort) => {
  return [...array].sort((a, b) => {
    return sort.ascending
      ? a[sort.param] - b[sort.param]
      : b[sort.param] - a[sort.param];
  });
};
