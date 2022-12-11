import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordsState {
  coords: {
    center:{
      latitude: number,
      longitude:number
    },
    bounds:Array<number>
  };
  loading: "idle" | "pending" | "succsess" | "failed";
}

const initialState: CoordsState = {
  coords: {center:{latitude:0,longitude:0},bounds:[]},
  loading: "idle",
};


const getLocation = () => {
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition)=>{
        const {coords:{latitude,longitude}} = position;
        const bounds = [
          latitude - .0111,
          longitude - .0111,
          latitude + .0111,
          longitude + .0111,
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
    setLocationBounds(state,action: PayloadAction<any>){
      let newBounds = [...state.coords.bounds];
      const {bounds} = state.coords;
      const type = action.payload;
      state.coords.bounds = newBounds
    },
    setCurrentPosition(state,action: PayloadAction<any>){
      console.log(action.payload);
      state.coords.center = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserGeolocation.fulfilled, (state, action: any) => {
        const {center,bounds} = action.payload;
        const data = {center,bounds}
        state.coords = data;
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
