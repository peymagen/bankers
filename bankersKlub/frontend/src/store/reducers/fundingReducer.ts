import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FundingState = {
  fundings: [],
};

const fundingSlice = createSlice({
  name: "funding",
  initialState,
  reducers: {
    addFunding: (state, action: PayloadAction<IFunding>) => {
      console.log(action);
      state.fundings = [];
      action.payload?.map((data: IFunding) => state.fundings.push(data));
    },
    removeFunding: (state, action: PayloadAction<string>) => {
      state.fundings = state.fundings.filter(
        (funding) => funding.id !== action.payload
      );
    },
  },
});

export const { addFunding, removeFunding } = fundingSlice.actions;

export default fundingSlice.reducer;
