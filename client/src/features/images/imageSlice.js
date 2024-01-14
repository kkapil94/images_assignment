import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
export const fetchImages = createAsyncThunk("fetchImages", async (token) => {
  let { data } = await axios.get(`${baseUrl}/api/v1/image/images`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.images;
});

const initialState = {
  isLoading: false,
  images: [],
  totalViews: 0,
  isError: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.images = action.payload;
      let totalViews = 0;
      state.images.forEach((image) => {
        totalViews += image.views;
      });
      state.totalViews = totalViews;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default imageSlice.reducer;
