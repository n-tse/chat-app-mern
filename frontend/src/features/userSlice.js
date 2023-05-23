// for user state management
import { createSlice } from '@reduxjs/toolkit';
import appApi from '../services/appAPI';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  // functions that'll change user's state
  reducers: {
    addNotifications: (state, { payload }) => {},
    resetNotifications: (state, { payload }) => {},
  },
  // extra reducers: help use to do more than simply changing the state. eg: save the state
  extraReducers: (builder) => {
    // saving the user after they sign up
    builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, {payload}) => payload);

    // save the user after they log in
    builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => payload);

    // logout user - destroy user session
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  }
});

// actions are coming from the reducers. calling the reducers updates our state
// only actions can change our state
export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;