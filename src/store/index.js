import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./api/albumsApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer, // likewise - albums: albumsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

// dev only
// make access to store from the console
// window.store = store;

setupListeners(store.dispatch);

export * from "./api/fetchUsersThunk";
export * from "./api/addUserThunk";
export * from "./api/removeUserThunk";
export { useFetchAlbumsQuery, useAddAlbumMutation } from "./api/albumsApi";
