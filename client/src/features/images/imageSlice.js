import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userToken = localStorage.getItem("user_token");

export const fetchImages = createAsyncThunk("fetchImages", async () => {
  const {data} = await axios.get("http://localhost:4000/api/v1/image/images", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data.images
});

const initialState = {
  isLoading: false,
  images: [],
  image: {},
  isError:false
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending,(state,action)=>{
        state.isLoading = true
    })
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true
    })
  },
});

export default imageSlice.reducer
