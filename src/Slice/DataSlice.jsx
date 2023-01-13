import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetch", async () => {
  // Fetching api
  const response = await fetch(
    "https://api.pexels.com/v1/curated?page=11&per_page=30",
    {
      method: "GET",
      headers: {
        Authorization:
          // "563492ad6f91700001000001fcbafef0b51b462aa972ab254ced170d",
          "563492ad6f917000010000018ca9c228a1e543fabdc77f6bc56284f9",
        "Content-Type": "multipart/mixed",
      },
    }
  );
  const data = response.json();
  return data;
});

const dataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    Data: [],
    loader: false,
    arr: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loader = true;
      state.Data = [];
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loader = false;
      for (let i = 0; i < action.payload.photos.length; i++) {
        var obj = {
          liked1: true,
          comment: "none",
          data: action.payload.photos[i],
        };
        state.arr.push(obj);
      }
      state.arr = [...state.arr];
      localStorage.setItem("Data", JSON.stringify(state.arr));
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.Data = [];
      state.loader = false;
    });
  },
});
export default dataSlice.reducer;
