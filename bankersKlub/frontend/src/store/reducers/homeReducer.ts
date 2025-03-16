import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IHomeState = {
  homes: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addHome: (state, action: PayloadAction<IHome>) => {
      console.log(action);
      state.homes = [];
      action.payload?.map((data: IHome) => state.homes.push(data));
    },
    removeHome: (state, action: PayloadAction<string>) => {
      state.homes = state.homes.filter((home) => home.id !== action.payload);
    },
  },
});

export const { addHome, removeHome } = homeSlice.actions;

export default homeSlice.reducer;
