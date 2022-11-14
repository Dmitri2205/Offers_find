import { TypedUseSelectorHook } from "react-redux";
import { RootState } from '../store/store';
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<import("redux").CombinedState<{
    storesReducer: import("immer/dist/internal").WritableDraft<import("../store/reducers/StoresSlice").StoresState>;
    coordsReducer: import("immer/dist/internal").WritableDraft<import("../store/reducers/CoordsSlice").CoordsState>;
}>, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
