import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPostsApi } from "../api/posts";
import { IPost } from "../components/Post/IPost";
import axios from "axios";

interface IPostState {
  list: Array<IPost>;
}

const initialState: IPostState = {
  list: [],
};

export const getPosts = createAsyncThunk("getPosts", async () => {
  const response = await getPostsApi();

  return await response.json();
});

export const savePost = createAsyncThunk(
  "sendPost",
  async (newPost: Omit<IPost, "id">) => {
    try {
      const { data } = await axios.post("http://localhost:8001/posts", newPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const counterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.list.push({
        id: state.list.length,
        date: new Date(),
        text: action.payload.text,
        authorId: action.payload.authorId,
      });
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export const { addPost, deletePost } = counterSlice.actions;
export default counterSlice.reducer;
