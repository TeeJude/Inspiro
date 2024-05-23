import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";
import auth from "../../../services/auth/authService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null
};



export const getPostDetailAction = createAsyncThunk(
  'post/get/detail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`${http.setURL}posts/${id}`);
      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  
    builder
      .addCase(getPostDetailAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostDetailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        // state.user = action.payload;
      })
      .addCase(getPostDetailAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default postSlice.reducer;