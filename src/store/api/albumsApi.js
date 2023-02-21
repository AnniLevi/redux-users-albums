import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { pause } from "./fetchUsersThunk";

const apiUrl = process.env.REACT_APP_API_URL;

// React Toolkit Query for fetching a list of user's albums from API

const albumsApi = createApi({
  reducerPath: "albums",

  // a pre-configured version of fetch function
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,

    // add pause for development purposes
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      // the hook albumsApi.useFetchAlbumsQuery() will be automatically generated
      fetchAlbums: builder.query({
        // builder.query - GET, builder.mutation - POST, PUT, PATCH, DELETE
        query: (user) => {
          return {
            url: "/albums",
            params: {
              // query params
              userId: user.id,
            },
            method: "GET",
          };
        },
        providesTags: (result, error, user) => {
          //list of tags
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
          // only one tag
          // return [{ type: "Album", id: user.id }];
        },
      }),
      addAlbum: builder.mutation({
        query(user) {
          return {
            url: "/albums",
            body: {
              userId: user.id,
              title: faker.commerce.productName(), // randomly generated title
            },
            method: "POST",
          };
        },
        // after adding a new album the request with tag from invalidatesTags is out of date
        // tag can be either a string or an object {type: ..., id: ...}
        // so another fetch request with the same tag in 'providesTags' will be called to synchronize data
        // if several tags assigned to one endpoint and if any of those tags get invalidated,
        // then the entire endpoint will re-fetch data
        invalidatesTags: (result, error, user) => {
          // the third argument here will be whatever you pass into mutation hook useAddAlbumMutation.addAlbum()
          return [{ type: "UsersAlbums", id: user.id }];
        },
      }),
      removeAlbum: builder.mutation({
        query(album) {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
