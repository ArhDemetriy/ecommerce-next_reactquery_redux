import type { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '@/4_shared/redux/createAppSlice';

/** Элемент корзины */
interface CartItem {
  productId: string;
  offerId: string;
  count: number;
}

/** Состояние корзины: ключ `${productId}_${offerId}` -> CartItem */
type CartState = Record<ReturnType<typeof getCartKey>, CartItem>;

const initialState: CartState = {};

/** Формирование ключа для записи в корзину */
const getCartKey = (productId: string, offerId: string) => `${productId}_${offerId}` as const;

export const cartSlice = createAppSlice({
  name: 'cart',
  initialState,
  reducers: create => ({
    /**
     * Добавить товар в корзину (или увеличить количество если уже есть)
     * @param productId - ID товара
     * @param offerId - ID оффера
     * @param count - количество (по умолчанию 1)
     */
    addItem: create.reducer((state, action: PayloadAction<{ productId: string; offerId: string; count?: number }>) => {
      const { productId, offerId, count = 1 } = action.payload;
      const key = getCartKey(productId, offerId);

      if (state[key]) {
        state[key].count += count;
      } else {
        state[key] = { productId, offerId, count };
      }
    }),

    /**
     * Удалить товар из корзины
     * @param productId - ID товара
     * @param offerId - ID оффера
     */
    removeItem: create.reducer((state, action: PayloadAction<{ productId: string; offerId: string }>) => {
      const { productId, offerId } = action.payload;
      const key = getCartKey(productId, offerId);
      delete state[key];
    }),

    /**
     * Обновить количество товара в корзине
     * @param productId - ID товара
     * @param offerId - ID оффера
     * @param count - новое количество
     */
    updateCount: create.reducer(
      (state, action: PayloadAction<{ productId: string; offerId: string; count: number }>) => {
        const { productId, offerId, count } = action.payload;
        const key = getCartKey(productId, offerId);

        if (state[key]) {
          state[key].count = count;
        }
      }
    ),

    /**
     * Универсальный метод установки количества:
     * - добавляет товар, если его нет в корзине
     * - удаляет товар, если count === 0
     * - обновляет количество в остальных случаях
     */
    setCount: create.reducer((state, action: PayloadAction<{ productId: string; offerId: string; count: number }>) => {
      const { productId, offerId, count } = action.payload;
      const key = getCartKey(productId, offerId);

      if (count === 0) {
        delete state[key];
      } else if (state[key]) {
        state[key].count = count;
      } else {
        state[key] = { productId, offerId, count };
      }
    }),

    /**
     * Очистить всю корзину
     */
    clearCart: create.reducer(() => initialState),
  }),
  selectors: {
    /** Получить весь объект корзины */
    selectCart: state => state,

    /** Получить товар по ключу `${productId}_${offerId}` */
    selectCartItemByKey: (state, { productId, offerId }: { productId: string; offerId: string }) =>
      state[getCartKey(productId, offerId)] ?? null,
  },
});

export const { addItem, removeItem, updateCount, setCount, clearCart } = cartSlice.actions;
export const { selectCart, selectCartItemByKey } = cartSlice.selectors;
