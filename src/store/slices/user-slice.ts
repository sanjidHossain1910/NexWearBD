import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ReduxUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  loading?: boolean;
};

type UserState = {
  currentUser: ReduxUser | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ReduxUser | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
