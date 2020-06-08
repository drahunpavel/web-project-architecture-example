const handlers = {
  ["SET_DATA"]: (state, { payload }) => ({ ...state, data: payload }),
  DEFAULT: (state) => state,
};

export const MainReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
