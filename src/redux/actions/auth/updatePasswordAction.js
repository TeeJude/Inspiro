import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  message: null,
  user:null,
  statusCode: null, // Adding status code to the initial state
};

export const updatePasswordAction = createAsyncThunk(
  'auth/reset-password',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.post(http.setURL + 'verify', payload);
      return { data: response.data, statusCode: response.status }; // Returning status code along with data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const updatePasswordSlice = createSlice({
  name: 'update_password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.statusCode = action.payload.statusCode; // Setting status code from action payload
        // state.user = action.payload;
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default updatePasswordSlice.reducer;