import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null
};

export const createCommentAction = createAsyncThunk(
  'comment/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.instance.post( `posts/${payload.id}/comments`, payload.data
    );
      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const CommentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
   
  },
});



export default CommentSlice.reducer;