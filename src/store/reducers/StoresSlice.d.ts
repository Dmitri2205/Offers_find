import { PayloadAction } from "@reduxjs/toolkit";
export interface StoresState {
    stores: Array<any>;
    loading: "idle" | "pending" | "rejected" | "loaded";
}
export declare const loadStores: import("@reduxjs/toolkit").AsyncThunk<any, any, {}>;
export declare const storesSlice: import("@reduxjs/toolkit").Slice<import("immer/dist/internal").WritableDraft<StoresState>, {
    setStores(state: import("immer/dist/internal").WritableDraft<StoresState>, action: PayloadAction<any>): void;
    setStoreOffers(state: import("immer/dist/internal").WritableDraft<StoresState>, action: PayloadAction<any>): void;
}, "stores">;
declare const _default: import("redux").Reducer<import("immer/dist/internal").WritableDraft<StoresState>, import("redux").AnyAction>;
export default _default;
