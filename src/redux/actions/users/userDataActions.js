import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../services/http/httpService";


const initialState = {
  loading: false,
  error: null,
  data:null,
  statusCode:null
};

export const getUserDataAction = createAsyncThunk(
  'users/data/all',
  async (payload,{ rejectWithValue }) => {
    
    try {
      
      const response = await http.instance.get('users');

      return {
        data: response.data,
        statusCode: response.status, // Status code from the HTTP response
      };

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const userDataSlice = createSlice({
  name: 'user_data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDataAction.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.loading = false;
      })
      .addCase(getUserDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
});



export default userDataSlice.reducer;