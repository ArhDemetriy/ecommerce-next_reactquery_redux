'use client';

import { Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { addItem, selectCartItemByKey, setCount } from '@/3_entities/Cart/redux';
import type { ApiResponse } from '@/4_shared/api';
import { useAppDispatch, useAppSelector } from '@/4_shared/redux/hooks';

export function ProductCartControl({
  offer,
  countStep,
  product,
}: {
  offer: NonNullable<ApiResponse<'/api/products'>['data'][number]['offers']>[number];
  countStep: number;
  product: ApiResponse<'/api/products'>['data'][number];
}) {
  const cartItem = useAppSelector(state =>
    selectCartItemByKey(state, { productId: product.slug, offerId: offer.uuid })
  );

  if (cartItem?.count) return <CartControlEdit offer={offer} countStep={countStep} product={product} />;
  return <CartControlAdd offer={offer} countStep={countStep} product={product} />;
}

type CartControlProps = Parameters<typeof ProductCartControl>[0];

function CartControlAdd({ offer, countStep, product }: CartControlProps) {
  const dispatch = useAppDispatch();

  const unitPrice = parseFloat(offer?.price || '0');
  const unit = offer?.unit || 'шт.';
  const maxCount = offer.quantity;

  const [count, setCount] = useState(countStep);

  const handleDecrement = () => setCount(prev => Math.max(countStep, prev - countStep));
  const handleIncrement = () => setCount(prev => Math.min(maxCount, prev + countStep));

  const totalPrice = (unitPrice * count).toFixed(2);

  const handleAddToCart = () => {
    if (!offer?.uuid) {
      console.error('Не найден UUID оффера для добавления в корзину');
      return;
    }

    dispatch(
      addItem({
        productId: product.slug,
        offerId: offer.uuid,
        count,
      })
    );

    console.log('Товар добавлен в корзину:', {
      slug: product.slug,
      name: product.name,
      offerId: offer.uuid,
      count,
      unitPrice,
      totalPrice,
    });
  };

  return (
    <>
      {/* Каунтер */}
      <div className="my-8 border-t border-b border-stroke px-5 py-2 sm:mx-5 sm:rounded-[10px] sm:border-r sm:border-l">
        <div className="flex items-center justify-between gap-4">
          {/* Кнопка минус */}
          <button
            type="button"
            onClick={handleDecrement}
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-stroke"
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Количество и сумма */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[14px] leading-[1.4] text-black md:text-body">
              {count} {unit}
            </span>
            <span className="text-[12px] leading-[1.4] text-gray">
              на {Number(totalPrice).toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Кнопка плюс */}
          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-stroke"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Кнопка добавления в корзину */}
      <div className="p-5 pt-0 md:pt-5">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded-[10px] bg-blue px-5 py-3.5 text-price leading-[1.4] font-bold text-white transition-colors hover:bg-blue-active md:text-body-bold"
        >
          Добавить в корзину
        </button>
      </div>
    </>
  );
}

function CartControlEdit({ offer, countStep, product }: CartControlProps) {
  const dispatch = useAppDispatch();

  // Получаем количество из Redux
  const cartItem = useAppSelector(state =>
    selectCartItemByKey(state, { productId: product.slug, offerId: offer.uuid })
  );

  const unitPrice = parseFloat(offer?.price || '0');
  const unit = offer?.unit || 'шт.';
  const maxCount = offer.quantity;

  const count = cartItem?.count || countStep;

  const handleDecrement = () => {
    const newCount = Math.max(countStep, count - countStep);
    dispatch(
      setCount({
        productId: product.slug,
        offerId: offer.uuid,
        count: newCount,
      })
    );
  };

  const handleIncrement = () => {
    const newCount = Math.min(maxCount, count + countStep);
    dispatch(
      setCount({
        productId: product.slug,
        offerId: offer.uuid,
        count: newCount,
      })
    );
  };

  const totalPrice = (unitPrice * count).toFixed(2);

  return (
    <>
      {/* Каунтер */}
      <div className="my-8 border-t border-b border-stroke px-5 py-2 sm:mx-5 sm:rounded-[10px] sm:border-r sm:border-l">
        <div className="flex items-center justify-between gap-4">
          {/* Кнопка минус */}
          <button
            type="button"
            onClick={handleDecrement}
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-stroke"
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Количество и сумма */}
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[14px] leading-[1.4] text-black md:text-body">
              {count} {unit}
            </span>
            <span className="text-[12px] leading-[1.4] text-gray">
              на {Number(totalPrice).toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Кнопка плюс */}
          <button
            type="button"
            onClick={handleIncrement}
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[6px] bg-background text-black transition-colors hover:bg-stroke"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Ссылка на корзину */}
      <div className="p-5 pt-0 md:pt-5">
        <Link
          href="/cart"
          className="flex w-full items-center justify-center rounded-[10px] bg-blue px-5 py-3.5 text-price leading-[1.4] font-bold text-white transition-colors hover:bg-blue-active md:text-body-bold"
        >
          Перейти в корзину
        </Link>
      </div>
    </>
  );
}
