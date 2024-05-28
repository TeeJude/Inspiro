import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null
};



export const getUserDetailAction = createAsyncThunk(
  'user/get/detail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.instance.get(`${http.setURL}users/${id}`);
      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const userDetailSlice = createSlice({
  name: 'user_details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  
    builder
      .addCase(getUserDetailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        // state.user = action.payload;
      })
      .addCase(getUserDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default userDetailSlice.reducer;