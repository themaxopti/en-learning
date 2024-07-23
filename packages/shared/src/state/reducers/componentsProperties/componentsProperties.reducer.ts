import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface ComponentsPropertiesState {
  navbar: { width: string };
}

const initialState: ComponentsPropertiesState = {
  navbar: {
    width: "200px",
  },
};

export const componentsPropertiesSlice = createSlice({
  name: "componentsProperties",
  initialState,
  reducers: {
    setNavbarWidth: (state, action: PayloadAction<string>) => {
      state.navbar.width = action.payload;
    },
  },
});

export const { setNavbarWidth } = componentsPropertiesSlice.actions;
