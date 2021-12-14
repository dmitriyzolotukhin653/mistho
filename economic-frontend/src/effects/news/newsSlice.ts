import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequest } from '../../axios';
import { INewsState } from './type';

const initialState: INewsState = {
  status: 'idle',
  data: [],
};

export const fetchNews = createAsyncThunk('user/fetchNews', async () => {
  try {
    const response = await httpRequest.get('/news');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchSingleNews = createAsyncThunk('user/fetchSingleNews', async (link: string) => {
  try {
    const response = await httpRequest.get('/news/single', { params: { link } });
    return { response, link };
  } catch (error) {
    throw error;
  }
});

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.news;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchSingleNews.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchSingleNews.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const findIndex = state.data.findIndex((item) => item.link === action.payload.link);
      state.data[findIndex].text = action.payload.response.data.textNews;
    });
    builder.addCase(fetchSingleNews.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default newsSlice.reducer;
