export const getLastUrlPath = (url: string) => {
  const split = url.split('/');
  return split[split.length - 1];
};
