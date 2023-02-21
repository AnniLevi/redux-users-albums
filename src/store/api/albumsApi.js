import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const apiUrl = process.env.REACT_APP_API_URL;

// React Toolkit Query for fetching a list of user's albums from API

const albumsApi = createApi({
  reducerPath: "albums",

  // a pre-configured version of fetch function
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
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
          return [{ type: "Album", id: user.id }];
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
        // so another fetch request with the same tag will be called to synchronize data
        invalidatesTags: (result, error, user) => {
          // the third argument here will be whatever you pass into mutation hook useAddAlbumMutation.addAlbum()
          return [{ type: "Album", id: user.id }];
        },
      }),
      //
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
