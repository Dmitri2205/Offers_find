import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToBuyItem = {
        name:string,
        current_prices: {
            price_reg__min: number,
            price_promo__min: number
        },
        img_link: string,
        store_name: string
}

export interface IToBuy {
    list: Array<ToBuyItem>
}

const initialState: IToBuy = {
    list:[]
}

export const toBuySlice = createSlice({
    name:'toBuy',
    initialState,
    reducers:{
        addToBuy(state,action:PayloadAction<any>){
            const {name,current_prices,img_link,store_name}: ToBuyItem = action.payload;
            state.list.push({name,current_prices,img_link,store_name});
        },
        removeToBuy(state,action:PayloadAction<any>){
            const {payload} = action;
            state.list[payload.index] = payload.value;
        }
    }
})

export default toBuySlice.reducer;