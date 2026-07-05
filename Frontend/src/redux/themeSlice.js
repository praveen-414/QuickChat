import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "Light",
  },
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "Light" ? "Dark" : "Light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
