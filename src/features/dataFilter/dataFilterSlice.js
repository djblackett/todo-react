import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: "dataFilter",
  initialState: "all",
  reducers: {
    changeFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
};

const dataFilterSlice = createSlice(options);

export const selectDataFilter = (state) => {
  return state.dataFilter;
};

export const { changeFilter } = dataFilterSlice.actions;
export default dataFilterSlice.reducer;
