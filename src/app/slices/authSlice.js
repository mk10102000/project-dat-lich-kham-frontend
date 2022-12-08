import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storegeKeys from '../../constants/storegeKeys';
import { removeUser } from '../../utils/local';
const initialState = {
  currentUser: JSON.parse(localStorage.getItem(storegeKeys.USER)),
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
      removeUser();
    },
  },
  extraReducers: (builder) => {},
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
