import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoresState {
    stores: Array<any>;
}

interface OffersInterface {
    storeIndex: number;
    data: Array<any>;
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
        },
        setStoreOffers(state,action: PayloadAction<any>){
            const {data,storeIndex} = action.payload;
            console.log(action.payload);
            state.stores[storeIndex].offers = data;
        }
    }
})

export default storesSlice.reducer;