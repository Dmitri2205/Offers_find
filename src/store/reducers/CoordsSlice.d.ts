import { PayloadAction } from "@reduxjs/toolkit";
export interface CoordsState {
    coords: any;
    loading: "idle" | "pending" | "succsess" | "failed";
}
export declare const getUserGeolocation: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {}>;
export declare const coordsSlice: import("@reduxjs/toolkit").Slice<import("immer/dist/internal").WritableDraft<CoordsState>, {
    setLocationBounds(state: import("immer/dist/internal").WritableDraft<CoordsState>, action: PayloadAction<any>): void;
}, "coords">;
declare const _default: import("redux").Reducer<import("immer/dist/internal").WritableDraft<CoordsState>, import("redux").AnyAction>;
export default _default;
