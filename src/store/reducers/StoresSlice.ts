import { useAppSelector } from "../../hooks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@API";

export interface StoresState {
    stores: Array<any>;
    loading: "idle" | "pending" | "rejected" | "loaded"
}

interface OffersInterface {
    storeIndex: number;
    data: Array<any>;
}

const initialState: StoresState = {
    stores:[],
    loading:"idle"

}

const getStores = async (coords: any):Promise<any> => {
       return api.getStoresAround(coords.bounds)
      .then((res: any) => {
        let result = res.data;
        result = result.replace(/^\w+[callback(]/gm, "");
        result = result.slice(0, -2);
        JSON.stringify(result);
        const data = JSON.parse(result).data;
        const { features } = data;
        let normalizedResponse = [];
        for (let el of features) {
          const normalizedItem = {
            ...el.properties,
            coordinates: el.geometry.coordinates,
            sap_code: el.sap_code,
          };
          normalizedResponse.push(normalizedItem); 
        };
        return(normalizedResponse);
        })
        .catch((error)=>{
            throw new Error(error.message);
        });
};

export const loadStores = createAsyncThunk(
    "stores/getStores",
    async (coords: any,thunkApi) => getStores(coords)
);

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
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadStores.fulfilled,(state,action) => {
            console.log(action.payload)
            state.stores = action.payload;
        })
        .addCase(loadStores.rejected,(state,action) => {

        })
        .addCase(loadStores.pending,(state,action) => {

        })
    }
})

export default storesSlice.reducer;