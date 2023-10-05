import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    bookStart(state) {
      state.loading = true;
    },
    booksSuccess(state, action) {
      state.books = action.payload;
      state.loading = false;
    },
    bookFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default bookSlice.reducer;
export const { bookStart, bookFailure, booksSuccess } = bookSlice.actions;
