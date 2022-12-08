import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  specialtyed: '',
  data: {
    services: [],
  },
};
export const bookServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addSpecial(state, action) {
      state.specialtyed = action.payload;
    },
    addService(state, action) {
      state.data.services.unshift(action.payload);
    },
    deleteService(state, action) {
      const id = action.payload;
      const newService = state.data.services.filter((item) => item.id !== id);
      state.data.services = newService;
    },
  },
  extraReducers: (builder) => {},
});
export const { addSpecial, addService, deleteService } =
  bookServiceSlice.actions;

export default bookServiceSlice.reducer;
