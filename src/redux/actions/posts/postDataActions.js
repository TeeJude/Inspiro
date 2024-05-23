import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";
import auth from "../../../services/auth/authService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null
};

export const getPostDataAction = createAsyncThunk(
  'post/data/all',
  async (payload,{ rejectWithValue }) => {
    
    try {
      
      const response = await http.instance.get('posts');

      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const postDataSlice = createSlice({
  name: 'post_data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostDataAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(getPostDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
});



export default postDataSlice.reducer;