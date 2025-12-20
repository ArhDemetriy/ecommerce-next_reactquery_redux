'use client';

import { useQueries } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { selectCart } from '@/3_entities/Cart/redux';
import { productBySlugOptions } from '@/4_shared/query';
import { useAppSelector } from '@/4_shared/redux/hooks';

import { CartList } from './CartList';
import { CartSummary } from './CartSummary';

export function CartPageContent() {
  const router = useRouter();
  const cart = useAppSelector(selectCart);
  const cartItems = Object.values(cart);

  return (
    <>
      {/* Шапка: кнопка назад + заголовок */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex items-center justify-start">
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute flex items-center gap-2 text-catalog text-black transition-colors hover:text-blue"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            <span>Вернуться к покупкам</span>
          </button>
        </div>
        <h1 className="text-h1 text-black">Корзина</h1>
        <div /> {/* Spacer для центрирования заголовка */}
      </div>

      {/* Контент: список товаров + сайдбар */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <CartList />
        <CartSummaryWrapper cartItems={cartItems} />
      </div>
    </>
  );
}

/** Обёртка для CartSummary, которая загружает цены товаров и считает итоги */
function CartSummaryWrapper({
  cartItems,
}: {
  cartItems: Array<{ productId: string; offerId: string; count: number }>;
}) {
  const productQueries = useQueries({
    queries: cartItems.map(item => productBySlugOptions({ slug: item.productId })),
  });

  const { itemsCount, totalSum, isLoading } = useMemo(() => {
    if (productQueries.some(query => query.isLoading)) {
      return {
        isLoading: true,
        itemsCount: 0,
        totalSum: 0,
      } as const;
    }

    const result = cartItems.reduce(
      (acc, { offerId, count }, index) => {
        const offer = productQueries[index].data?.offers.find(o => o.uuid === offerId);
        if (!offer) return acc;

        const unitPrice = parseFloat(offer.price || '0');
        if (!unitPrice) return acc;
        acc.totalSum += unitPrice * count;
        acc.itemsCount++;

        return acc;
      },
      { itemsCount: 0, totalSum: 0 }
    );

    return {
      ...result,
      isLoading: false as const,
    };
  }, [cartItems, productQueries]);

  if (isLoading) {
    return (
      <div className="sticky top-5 flex w-full max-w-[352px] animate-pulse flex-col gap-5 rounded-[20px] bg-white p-6">
        <div className="h-8 w-32 rounded bg-background" />
        <div className="h-20 rounded-[10px] bg-background" />
        <div className="h-12 rounded-[10px] bg-background" />
        <div className="h-6 rounded bg-background" />
        <div className="h-px bg-stroke" />
        <div className="h-12 rounded bg-background" />
        <div className="h-px bg-stroke" />
        <div className="h-16 rounded bg-background" />
        <div className="h-12 rounded bg-background" />
        <div className="h-14 rounded-[10px] bg-background" />
      </div>
    );
  }

  return <CartSummary itemsCount={itemsCount} totalSum={totalSum} />;
}
