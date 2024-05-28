import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  message: null,
  user:null,
  statusCode: null, // Adding status code to the initial state
};

export const verifyEmailAction = createAsyncThunk(
  'auth/verify',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.post(http.setURL + 'verify', payload);
      return { data: response.data, statusCode: response.status }; // Returning status code along with data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const verifyEmailSlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.statusCode = action.payload.statusCode; // Setting status code from action payload
        // state.user = action.payload;
      })
      .addCase(verifyEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default verifyEmailSlice.reducer;