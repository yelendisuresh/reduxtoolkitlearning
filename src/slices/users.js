import { createSlice } from "@reduxjs/toolkit";
import usersInitialState from "../data/users";
import usersReducer from "../reducers/users";

let usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: usersReducer
});

export const { login, logout } = usersSlice.actions;

export default usersSlice;
