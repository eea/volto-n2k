const initialState = {};

export default function storage(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_LOCALSTORAGE':
      return {
        ...state,
        [action.key]: action.value,
      };

    case 'DELETE_LOCALSTORAGE':
      const newState = { ...state };
      delete newState[action.key];
      return {
        ...newState,
      };

    case 'RESET_LOCALSTORAGE':
      return initialState;

    default:
      return state;
  }
}
