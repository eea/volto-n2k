export const setCookie = (key, value) => {
  return {
    type: 'SET_COOKIE',
    key,
    value,
  };
};

export const deleteCookie = (key, value) => {
  return {
    type: 'DELETE_COOKIE',
    key,
    value,
  };
};
