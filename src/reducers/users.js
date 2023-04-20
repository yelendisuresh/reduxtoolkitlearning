let usersReducer = {

  //users/login
  login: (state, action) => {
    state.isLoggedIn = true;
    state.currentUser = action.payload
  },

  //users/logout
  logout: (state, action) => {
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

export default usersReducer;
