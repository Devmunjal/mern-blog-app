export const updateToken = (token) => {
  return {
    type: "UPDATE_TOKEN",
    payload: token,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
