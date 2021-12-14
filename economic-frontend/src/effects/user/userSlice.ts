import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpRequest } from '../../axios';
import { IUserState, IValidationError, RequestUser, RequestUserType } from './type';
import axios, { AxiosError } from 'axios';

const initialState: IUserState = {
  status: 'idle',
  data: {
    email: '',
    password: '',
    username: '',
  },
  errorMessage: '',
};

export const fetchAuth = createAsyncThunk(
  'user/fetchAuth',
  async ({ user, type }: RequestUser, { rejectWithValue }) => {
    try {
      const response = await httpRequest.post(`/auth/${type}`, user);
      return response.data.user;
    } catch (error) {
      const err = error as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        if (type === RequestUserType.SIGNUP) {
          return rejectWithValue(err?.response?.data.errors);
        } else {
          return rejectWithValue(err?.response?.data.message);
        }
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetError: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = '';
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = 'failed';
      if (action.payload) {
        state.errorMessage = <string | IValidationError>action.payload;
      }
    });
  },
});

export const { logout, resetError } = userSlice.actions;

export default userSlice.reducer;
