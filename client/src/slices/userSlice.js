import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log("TOKEN SENT TO BACKEND:", token);

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`
, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("BACKEND DATA:", data); // THIS IS YOUR ARRAY

      return data; // <--- THIS RETURNS THE ARRAY DIRECTLY
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // <--- DIRECT ARRAY (NOT items.users)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
