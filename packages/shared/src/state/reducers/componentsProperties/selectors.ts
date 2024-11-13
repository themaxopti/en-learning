// @ts-ignore
import { RootState } from "@services/main/src/store/store";

export const navbarWidthSelectort = (state: RootState) =>
  state.componentsProperties.navbar.width;


export const isDictionaryControllFixedSelector = (state: RootState) => state.componentsProperties.dictionaryControll.fixed
export const dictionaryControllWidthSelector = (state: RootState) => state.componentsProperties.dictionaryControll.width