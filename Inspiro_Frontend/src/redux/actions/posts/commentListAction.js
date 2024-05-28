import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null,
};

export const getCommentLstsAction = createAsyncThunk(
  'comment/lists',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.instance.get( `posts/${id}/comments`
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



const CommentListsSlice = createSlice({
  name: 'comments_lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentLstsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentLstsAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.createStatusCode = action.payload.createStatusCode;
        state.loading = false;
      })
      .addCase(getCommentLstsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
     
  },
});



export default CommentListsSlice.reducer;