import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: "dataFilter",
  initialState: "all",
};

const dataFilterSlice = createSlice(options);

export default dataFilterSlice.reducer;
