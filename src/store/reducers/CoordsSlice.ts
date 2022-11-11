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
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition)=>{
        console.log(position);
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



const watchUserLocation = () => {

  const success = (pos: GeolocationPosition) => {
    console.log(pos)
  }

  const error = (err: any) => {
    console.log(err)
  }

  if(navigator.geolocation){
    navigator.geolocation.watchPosition(success,error)
  }
}

export const getUserGeolocation = createAsyncThunk(
  "coords/getUserGeolocation",
  getLocation
  // watchUserLocation
);

export const coordsSlice = createSlice({
  name: "coords",
  initialState,
  reducers: {
    setLocationBounds(state,action: PayloadAction<any>){
      let newBounds = [...state.coords.bounds];
      const {bounds} = state.coords;
      const type = action.payload;
      if(type === "все"){
        
      }
      state.coords.bounds = newBounds
    }
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
