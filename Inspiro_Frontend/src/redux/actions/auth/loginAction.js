import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.post(http.setURL + 'login', payload);
      return {
        data: response.data,
        user: response.data.user, // Assuming user is available in response data
        statusCode: response.status, // Status code from the HTTP response
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.post(http.setURL + 'logout', payload);
      return {
        data: response.data,
        user: response.data.user, // Assuming user is available in response data
        statusCode: response.status, // Status code from the HTTP response
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.user = action.payload.user;
        state.statusCode = action.payload.statusCode;
        state.loading = false;

      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default loginSlice.reducer;