import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  message: null,
  user:null,
  statusCode: null, // Adding status code to the initial state
};

export const resetPasswordEmailAction = createAsyncThunk(
  'auth/reset-password-email',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.post(http.setURL + 'resetpassword', payload);
      return { data: response.data, statusCode: response.status }; // Returning status code along with data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const resetPasswordEmailSlice = createSlice({
  name: 'reset_password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordEmailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordEmailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.statusCode = action.payload.statusCode; // Setting status code from action payload
        // state.user = action.payload;
      })
      .addCase(resetPasswordEmailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default resetPasswordEmailSlice.reducer;