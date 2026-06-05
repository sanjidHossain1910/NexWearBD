import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";



export const fetchProducts = createAsyncThunk(
  "products/fetchRecentViewProducts",
  async ({ currentUser }: { currentUser: any }) => {
    const response = await fetch(
      `/api/recentview?userId=${currentUser.id}`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Could not load products");
    return (await response.json()) as Product[];
  })

export const recentViewProductsSlice = createSlice({
  name: "recentViewProducts",
  initialState: [] as Product[],
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          return action.payload;
        }
      );
  },
});

export const {} = recentViewProductsSlice.actions;

export default recentViewProductsSlice.reducer;