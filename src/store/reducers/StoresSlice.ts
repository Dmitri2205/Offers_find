import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoresState {
    stores: Array<any>;
}

const initialState: StoresState = {
    stores:[]

}

export const storesSlice = createSlice({
    name:'stores',
    initialState,
    reducers: {
        setStores(state,action: PayloadAction<any>){
            state.stores = action.payload;
        }
    }
})

export default storesSlice.reducer;