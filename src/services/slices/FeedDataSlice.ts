import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: null | string;
  loading: boolean;
};

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const feedDataSlice = createSlice({
  name: 'feeddata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalEmountOrders: (state) => state.total,
    getTotalEmountToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});

export default feedDataSlice;
export const {
  getFeedOrders,
  getTotalEmountOrders,
  getTotalEmountToday,
  getLoading,
  getError
} = feedDataSlice.selectors;
