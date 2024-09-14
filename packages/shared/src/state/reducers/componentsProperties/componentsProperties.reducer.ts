import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface ComponentsPropertiesState {
  navbar: { width: string };
  header: {
    height: string
  }
  dictionaryControll: {
    fixed: boolean
  }
}

const initialState: ComponentsPropertiesState = {
  navbar: {
    width: "200px",
  },
  header: {
    height: "60px"
  },
  dictionaryControll: {
    fixed: false
  }
};

export const componentsPropertiesSlice = createSlice({
  name: "componentsProperties",
  initialState,
  reducers: {
    setNavbarWidth: (state, action: PayloadAction<string>) => {
      state.navbar.width = action.payload;
    },
    setDictionaryControllFixed(state, action: PayloadAction<boolean>) {
      state.dictionaryControll.fixed = action.payload
    },
  },
});

export const { setNavbarWidth, setDictionaryControllFixed } = componentsPropertiesSlice.actions;
