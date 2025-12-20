'use client';

import { Minus, Plus } from 'lucide-react';

import { selectCartItemByKey, setCount } from '@/3_entities/Cart/redux';
import { useAppDispatch, useAppSelector } from '@/4_shared/redux/hooks';

export function CartQuantityControl({
  productSlug,
  offerId,
  countStep,
  maxCount,
  unitPrice,
  unit,
}: {
  /** Slug товара (productId в корзине) */
  productSlug: string;
  /** UUID оффера */
  offerId: string;
  /** Шаг изменения количества (минимальная покупка) */
  countStep: number;
  /** Максимальное количество (наличие на складе) */
  maxCount: number;
  /** Цена за единицу */
  unitPrice: number;
  /** Единица измерения */
  unit: string;
}) {
  const dispatch = useAppDispatch();

  // Получаем количество из Redux store
  const cartItem = useAppSelector(state => selectCartItemByKey(state, { productId: productSlug, offerId }));
  const count = cartItem?.count || 0;

  const handleDecrement = () => {
    const newCount = Math.max(countStep, count - countStep);
    dispatch(
      setCount({
        productId: productSlug,
        offerId,
        count: newCount,
      })
    );
  };

  const handleIncrement = () => {
    const newCount = Math.min(maxCount, count + countStep);
    dispatch(
      setCount({
        productId: productSlug,
        offerId,
        count: newCount,
      })
    );
  };

  const totalPrice = unitPrice * count;
  const isAtMinimum = count <= countStep;
  const isAtMaximum = count >= maxCount;

  return (
    <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start">
      {/* Кнопка минус */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isAtMinimum}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:hover:text-black"
      >
        <Minus className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {/* Количество и сумма */}
      <div className="flex min-w-[80px] flex-1 flex-col items-center gap-0.5 sm:flex-initial">
        <span className="text-description text-black">
          {count} {unit}
        </span>
        <span className="text-[12px] leading-[1.4] text-gray">
          на {totalPrice.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
        </span>
      </div>

      {/* Кнопка плюс */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={isAtMaximum}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background disabled:hover:text-black"
      >
        <Plus className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
