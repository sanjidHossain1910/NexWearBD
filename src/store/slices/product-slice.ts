import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

type ProductWithId = Product & { _id: string };

type ProductState = {
  items: ProductWithId[];
  selectedProduct: ProductWithId | null;
  total: number;
  page: number;
  pages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  total: 0,
  page: 1,
  pages: 1,
  status: "idle",
  error: null
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query: Record<string, string | number | undefined> | undefined = undefined) => {
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") params.set(key, String(value));
    });
    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) throw new Error("Could not load products");
    return (await response.json()) as { items: ProductWithId[]; total: number; page: number; pages: number };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<{ items: ProductWithId[]; total?: number; page?: number; pages?: number }>) => {
      state.items = action.payload.items;
      state.total = action.payload.total ?? action.payload.items.length;
      state.page = action.payload.page ?? 1;
      state.pages = action.payload.pages ?? 1;
      state.status = "succeeded";
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductWithId | null>) => {
      state.selectedProduct = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
      state.selectedProduct = null;
      state.total = 0;
      state.page = 1;
      state.pages = 1;
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Could not load products";
      });
  }
});

export const { clearProducts, setProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
