import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export * from "./api/fetchUsersThunk";
export * from "./api/addUserThunk";
export * from "./api/removeUserThunk";
