declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    storesReducer: import("immer/dist/internal").WritableDraft<import("./reducers/StoresSlice").StoresState>;
    coordsReducer: import("immer/dist/internal").WritableDraft<import("./reducers/CoordsSlice").CoordsState>;
}>, import("redux").AnyAction>;
export declare const store: import("@reduxjs/toolkit").EnhancedStore<import("redux").CombinedState<{
    storesReducer: import("immer/dist/internal").WritableDraft<import("./reducers/StoresSlice").StoresState>;
    coordsReducer: import("immer/dist/internal").WritableDraft<import("./reducers/CoordsSlice").CoordsState>;
}>, import("redux").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    storesReducer: import("immer/dist/internal").WritableDraft<import("./reducers/StoresSlice").StoresState>;
    coordsReducer: import("immer/dist/internal").WritableDraft<import("./reducers/CoordsSlice").CoordsState>;
}>, import("redux").AnyAction, undefined>]>;
export declare type RootState = ReturnType<typeof rootReducer>;
export declare type AppDispatch = typeof store.dispatch;
export {};
