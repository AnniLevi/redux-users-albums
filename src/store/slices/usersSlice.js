import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/fetchUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      // fetchUsers.pending === 'users/fetch/pending'

      // data is loading
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // request success
      state.isLoading = false;
      // action.payload === request.data from fetchUsers function
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      // error occurred with request
      state.isLoading = false;
      // in this case action.error is an error object
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
