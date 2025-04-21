import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newPost: "",
  editId: null,
  editPost: "",
  currentPage: 1,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    startEdit: (state, action) => {
      state.editId = action.payload.id;
      state.editPost = action.payload.post;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setNewPost, setEditPost, setEditId, startEdit, setCurrentPage } =
  postSlice.actions;

export default postSlice.reducer;
