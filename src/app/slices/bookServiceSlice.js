import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  specialtyed: '',
  services: {},
};
export const bookServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addSpecial(state, action) {
      state.specialtyed = action.payload;
    },
    addService(state, action) {
      state.services = action.payload;
    },
    deleteService(state, action) {
      state.services = {};
    },
  },
  extraReducers: (builder) => {},
});
export const { addSpecial, addService, deleteService } =
  bookServiceSlice.actions;

export default bookServiceSlice.reducer;
