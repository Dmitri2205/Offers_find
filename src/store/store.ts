import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import storesReducer  from './reducers/StoresSlice'; 
import coordsReducer  from './reducers/CoordsSlice'; 
import toBuyReducer  from './reducers/ToBuySlice'; 


const rootReducer = combineReducers({
    storesReducer,
    coordsReducer,
    toBuyReducer
})

export const store = configureStore({
  reducer:rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch