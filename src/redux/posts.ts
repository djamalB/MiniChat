import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPostsApi } from "../api/posts";
import { IPost } from "../components/Post/IPost";
import axios from "axios";

interface IPostState {
  list: Array<IPost>;
  editText: string;
}

const initialState: IPostState = {
  list: [],
  editText: "",
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

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ id, text }: { id: number; text: string }) => {
    await axios.patch(`http://localhost:8001/posts/${id}`, {
      text,
    });
    return { id, text };
  }
);

export const removePost = createAsyncThunk("removePost", async (id: number) => {
  try {
    await axios.delete(`http://localhost:8001/posts/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});

const counterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.list = state.list.filter((post) => post.id !== action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const postToUpdate = state.list.find(
        (post) => post.id === action.payload.id
      );
      if (postToUpdate) {
        postToUpdate.text = action.payload.text;
      }
    });
  },
});

export default counterSlice.reducer;
