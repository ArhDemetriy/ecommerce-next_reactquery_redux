'use client';

import { useQuery } from '@tanstack/react-query';
import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CartQuantityControl } from '@/2_features/CartQuantityControl';
import { removeItem, selectCartItemByKey } from '@/3_entities/Cart/redux';
import { productBySlugOptions } from '@/4_shared/query';
import { useAppDispatch, useAppSelector } from '@/4_shared/redux/hooks';
import { Skeleton } from '@/4_shared/ui';

export function CartItemCard({
  productSlug,
  offerId,
}: {
  /** Slug товара (productId в корзине) */
  productSlug: string;
  /** UUID оффера */
  offerId: string;
}) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(state => selectCartItemByKey(state, { productId: productSlug, offerId }));
  const { data: product, isLoading, isError } = useQuery(productBySlugOptions({ slug: productSlug }));
  if (isLoading) return <CartItemCardSkeleton />;
  if (isError || !product || !cartItem) return null;

  const offer = product.offers?.find(o => o.uuid === offerId);
  if (!offer) return null;

  const unitPrice = parseFloat(offer.price || '0');
  const unit = offer.unit || 'шт.';
  const countStep = parseInt(product['Мин. покупка, шт.'] || '1');
  const maxCount = offer.quantity;
  const imageUrl = product.images?.[0]?.card_url || '/placeholder.png';
  const isInStock = product['Наличие'] === 'Да в наличии';
  const totalPrice = unitPrice * cartItem.count;

  const handleRemove = () => dispatch(removeItem({ productId: productSlug, offerId }));
  const handleFavorite = () => console.log('Добавить в избранное:', productSlug);

  return (
    <li className="flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      {/* Верхняя часть (мобильный) / Левая часть (десктоп): изображение + действия + информация */}
      <div className="flex flex-1 items-start gap-3 sm:gap-4">
        {/* Изображение + кнопки действий под ним (мобильный) */}
        <div className="flex flex-shrink-0 flex-col items-center gap-2">
          <Link href={`/product/${product.slug}`} className="relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px]">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="rounded-[6px] object-cover"
              sizes="(max-width: 640px) 80px, 100px"
            />
          </Link>

          {/* Действия - на мобильном под изображением */}
          <div className="flex items-center gap-1 sm:hidden">
            <button
              type="button"
              onClick={handleFavorite}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-background text-gray transition-colors hover:bg-blue hover:text-white"
              title="В избранное"
            >
              <Heart className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-background text-gray transition-colors hover:bg-blue hover:text-white"
              title="Удалить"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Артикул, название, статус наличия (мобильный) */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[12px] leading-[1.4] text-gray">Арт. {product.article}</span>

          {/* Название */}
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-blue">
            <h3 className="line-clamp-2 text-catalog leading-[1.4] text-black">{product.name}</h3>
          </Link>

          {/* Статус наличия - на мобильном под названием */}
          <div className="mt-1 flex flex-col gap-0.5 sm:hidden">
            {isInStock ? (
              <span className="text-description text-green">В наличии</span>
            ) : (
              <>
                <span className="text-description text-blue">Под заказ</span>
                <span className="text-[12px] leading-[1.4] text-gray">До 10 рабочих дней</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Нижняя часть (мобильный) / Правая часть (десктоп): статус, счётчик, цена, действия */}
      <div className="flex items-center justify-between gap-4 border-t border-stroke pt-3 sm:flex-nowrap sm:gap-6 sm:border-0 sm:pt-0">
        {/* Статус наличия - только на десктопе */}
        <div className="hidden min-w-[100px] flex-col gap-0.5 sm:flex">
          {isInStock ? (
            <span className="text-description text-green">В наличии</span>
          ) : (
            <>
              <span className="text-description text-blue">Под заказ</span>
              <span className="text-[12px] leading-[1.4] text-gray">До 10 рабочих дней</span>
            </>
          )}
        </div>

        {/* Счётчик количества - на мобильном растягивается */}
        <div className="flex-1 sm:flex-initial">
          <CartQuantityControl
            productSlug={productSlug}
            offerId={offerId}
            countStep={countStep}
            maxCount={maxCount}
            unitPrice={unitPrice}
            unit={unit}
          />
        </div>

        {/* Цена */}
        <div className="flex min-w-[100px] flex-col items-end gap-0.5 sm:min-w-[120px]">
          <span className="text-body-bold text-black">
            {totalPrice.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
          </span>
          <span className="text-[12px] leading-[1.4] text-gray">
            {unitPrice.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} x{' '}
            {cartItem.count}
          </span>
        </div>

        {/* Действия - только на десктопе */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={handleFavorite}
            className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-background text-gray transition-colors hover:bg-blue hover:text-white"
            title="В избранное"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-background text-gray transition-colors hover:bg-blue hover:text-white"
            title="Удалить"
          >
            <Trash2 className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </li>
  );
}

function CartItemCardSkeleton() {
  return (
    <li className="flex flex-col gap-3 rounded-[10px] bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <div className="flex flex-1 items-start gap-3 sm:gap-4">
        <Skeleton className="h-[80px] w-[80px] flex-shrink-0 rounded-[6px] sm:h-[100px] sm:w-[100px]" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-full max-w-[300px]" />
          <Skeleton className="h-4 w-16 sm:hidden" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-stroke pt-3 sm:flex-nowrap sm:gap-6 sm:border-0 sm:pt-0">
        <Skeleton className="hidden h-10 w-[100px] sm:block" />
        <Skeleton className="h-10 flex-1 sm:w-[150px] sm:flex-initial" />
        <Skeleton className="h-10 w-[100px] sm:w-[120px]" />
        <Skeleton className="hidden h-10 w-[88px] sm:block" />
      </div>
    </li>
  );
}
