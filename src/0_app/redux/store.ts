import { type Action, type ThunkAction, configureStore } from '@reduxjs/toolkit';
import { combineSlices } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartSlice } from '@/3_entities/Cart/redux';

/** @private использовать только в конфиге редакса */
const rootReducer = combineSlices(
  // Используем персистентный редьюсер для корзины
  {
    cart: persistReducer(
      {
        key: 'cart',
        storage,
        whitelist: ['cart'], // Сохраняем только slice корзины
      },
      cartSlice.reducer
    ),
  }
);

/** @private использовать только в конфиге редакса */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          // Игнорируем redux-persist actions
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

/** @private создать persistor для store */
export const makePersistor = (store: ReturnType<typeof makeStore>) => persistStore(store);

declare global {
  type RootState = ReturnType<typeof rootReducer>;
  type AppStore = ReturnType<typeof makeStore>;
  type AppDispatch = AppStore['dispatch'];
  type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
}
