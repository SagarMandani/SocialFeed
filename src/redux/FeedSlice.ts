import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  page: 1,
  isLoading: false,
  isRefreshing: false,
  moreLoading: false,
};

const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchDataStart: state => {
      state.isLoading = true;
    },
    fetchDataEnd: state => {
      state.moreLoading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.data = [...state.data, ...action.payload];
      state.page += 1;
      state.isLoading = false;
      state.moreLoading = false;
    },
    fetchDataFailure: state => {
      state.isLoading = false;
      state.moreLoading = false;
    },
    refreshStart: state => {
      state.isRefreshing = true;
    },
    refreshSuccess: (state, action) => {
      state.data = action.payload;
      state.page = 1;
      state.isRefreshing = false;
    },
    refreshFailure: state => {
      state.isRefreshing = false;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataEnd,
  fetchDataSuccess,
  fetchDataFailure,
  refreshStart,
  refreshSuccess,
  refreshFailure,
} = FeedSlice.actions;

export default FeedSlice.reducer;
