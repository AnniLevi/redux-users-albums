import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "../api/fetchUsersThunk";
import { addUserThunk } from "../api/addUserThunk";
import { removeUserThunk } from "../api/removeUserThunk";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // fetch all users
    builder.addCase(fetchUsersThunk.pending, (state, action) => {
      // fetchUsersThunk.pending === 'users/fetch/pending'

      // data is loading
      state.isLoading = true;
    });
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      // request success
      state.isLoading = false;
      // action.payload === request.data from fetchUsersThunk function
      state.data = action.payload;
    });
    builder.addCase(fetchUsersThunk.rejected, (state, action) => {
      // error occurred with request
      state.isLoading = false;
      // in this case action.error is an error object
      state.error = action.error;
    });

    // add new user
    builder.addCase(addUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // remove user
    builder.addCase(removeUserThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;

      // action.payload is a user object to delete
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(removeUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
