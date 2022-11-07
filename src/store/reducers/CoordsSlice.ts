import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordsState {
  coords: any;
  loading: "idle" | "pending" | "succsess" | "failed";
}

const initialState: CoordsState = {
  coords: [],
  loading: "idle",
};


const getLocation = () => {
    return new Promise((resolve,reject)=>{
      if(!navigator.geolocation) reject("Geolocation is not supported");
      navigator.geolocation.getCurrentPosition((position)=>{
        const {coords:{latitude,longitude}} = position;
        const bounds = [
          latitude,
          latitude + 0.2,
          longitude,
          longitude + 0.2
        ];
        const points = {center:{latitude,longitude},bounds}
        resolve(points),reject
      })
    })
}

export const getUserGeolocation = createAsyncThunk(
  "coords/getUserGeolocation",
  getLocation
);

export const coordsSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    //стандартный редуктор
    // setCoords(state,action: PayloadAction<any>){
    //     state.coords = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGeolocation.fulfilled, (state, action) => {
        console.log(action.payload);
        state.coords = action.payload;
        state.loading = "succsess";
      })
      .addCase(getUserGeolocation.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getUserGeolocation.pending, (state, action) => {
        state.loading = "pending";
      });
  },
});

export default coordsSlice.reducer;
