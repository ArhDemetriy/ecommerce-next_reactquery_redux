import { configureStore } from '@reduxjs/toolkit';
import { combineSlices } from '@reduxjs/toolkit';

import { counterSlice } from '@/2_features/Counter/redux/counterSlice';
import { quotesApiSlice } from '@/2_features/Quotes/redux/quotesApiSlice';

/** @private использовать только в конфиге редакса */
export const rootReducer = combineSlices(counterSlice, quotesApiSlice);

/** @private использовать только в конфиге редакса */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(quotesApiSlice.middleware),
  });
