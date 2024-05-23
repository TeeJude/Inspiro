import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null,
};


export const deletePostAction = createAsyncThunk(
  'post/delete/action',
  async (id, { rejectWithValue }) => {

    try {
      const response = await http.instance.delete(`posts/${id}`);
     
      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const deletePostSlice = createSlice({
  name: 'post_delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder
      .addCase(deletePostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(deletePostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});



export default deletePostSlice.reducer;