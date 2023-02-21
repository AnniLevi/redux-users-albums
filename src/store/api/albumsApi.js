import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
