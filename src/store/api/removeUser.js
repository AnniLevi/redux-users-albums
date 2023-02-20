import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const removeUser = createAsyncThunk("users/remove", async (user) => {
  const response = await axios.delete(`${apiUrl}/users/${user.id}`);

  return response.data;
});

export { removeUser };
