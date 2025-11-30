import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Get all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const { data } = await axios.get(API_URL);
  return data;
});

// Create product
export const createProduct = createAsyncThunk("products/createProduct", async (product, { getState }) => {
  const token = getState().auth.user.token;
  const { data } = await axios.post(API_URL, product, { headers: { Authorization: `Bearer ${token}` } });
  return data;
});

// Delete product
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { getState }) => {
  const token = getState().auth.user.token;
  await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      .addCase(createProduct.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
