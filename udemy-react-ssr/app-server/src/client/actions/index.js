export const FETCH_USERS = "fetch_users";

export const fetchUsers = () => async (dispatch, getState, api) => {
  // api comes from the `withExtraArgument` call when the thunk middleware is applied to the store
  const res = await api.get("/users");

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};
