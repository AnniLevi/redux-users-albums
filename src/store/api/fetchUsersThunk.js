import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// React Async Thunk for fetching a list of users from API

// the first argument is a base type, it will be used to generate the action type which will be dispatched
// the action type will be generated as 'users/fetch/pending' when initially make a request
// and 'users/fetch/fulfilled' when data will be fetched successfully
// in case of error occurred during the request type will be 'users/fetch/rejected'
const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(`${apiUrl}/users`);

  // dev only
  // await pause(1000); // 1 sec

  // response.data will be returned inside the fulfilled action's payload
  return response.data;
});

// add a pause for development purposes
export const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsersThunk };
