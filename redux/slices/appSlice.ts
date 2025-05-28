import { AppState } from "@/types/reduxStates";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
  theme: "lightMode",
  showSideNav: false,
};

const appSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "lightMode" ? "darkMode" : "lightMode";
    },
    toggleSideNav(state) {
      state.showSideNav = !state.showSideNav;
    },
  },
});

export const { toggleTheme, toggleSideNav } = appSlice.actions;
export default appSlice.reducer;
