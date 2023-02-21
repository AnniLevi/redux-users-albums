import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/fetchUsers";
import { addUser } from "../api/addUser";
import { removeUser } from "../api/removeUser";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // fetch all users
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

    // add new user
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // remove user
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;

      // action.payload is a user object to delete
      state.data = state.data.filter((user) => {
        return user.id !== action.payload.id;
      });
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
