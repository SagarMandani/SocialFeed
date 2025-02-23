import {createSlice} from '@reduxjs/toolkit';
import {LightTheme, DarkTheme} from '../common';

const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: LightTheme,
  },
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme.mode === 'light' ? DarkTheme : LightTheme;
    },
  },
});

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;
