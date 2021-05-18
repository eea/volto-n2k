export const setLocalStorage = (key, value) => {
  return {
    type: 'SET_LOCALSTORAGE',
    key,
    value,
  };
};

export const deleteLocalStorage = (key) => {
  return {
    type: 'DELETE_LOCALSTORAGE',
    key,
  };
};

export const resetLocalStorage = () => {
  return {
    type: 'RESET_LOCALSTORAGE',
  };
};
