import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const apiUrl = process.env.REACT_APP_API_URL;

const addUserThunk = createAsyncThunk("users/add", async () => {
  const response = await axios.post(`${apiUrl}/users`, {
    name: faker.name.fullName(), // generate a random name
  });

  return response.data;
});

export { addUserThunk };
