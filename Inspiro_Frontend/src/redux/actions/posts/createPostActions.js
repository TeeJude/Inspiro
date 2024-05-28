import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null,
};

export const createPostAction = createAsyncThunk(
  'post/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await http.instance.post( 'posts', payload, 
      {
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }
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


export const editPostAction = createAsyncThunk(
  'post/edit',
  async (payload, { rejectWithValue }) => {

    try {
      const response = await http.instance.post(`posts/${payload.id}`, payload.data,
      {
        headers:{
          'Content-Type': 'multipart/form-data',
        }
      }
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


const createPostSlice = createSlice({
  name: 'post_create',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // Edit
    builder
      .addCase(editPostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPostAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(editPostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});



export default createPostSlice.reducer;