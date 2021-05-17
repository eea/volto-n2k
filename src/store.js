const initialState = {};

export default function tableau(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_COOKIE':
      return {
        ...state,
        [action.key]: action.value,
      };

    case 'DELETE_COOKIE':
      const newState = { ...state };
      delete newState[action.key];
      return {
        ...newState,
      };

    default:
      return state;
  }
}
