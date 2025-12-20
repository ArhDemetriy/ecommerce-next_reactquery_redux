'use client';

import { selectCart } from '@/3_entities/Cart/redux';
import { useAppSelector } from '@/4_shared/redux/hooks';

import { CartItemCard } from './CartItemCard';

export function CartList() {
  const cart = useAppSelector(selectCart);
  const cartItems = Object.values(cart);

  if (!cartItems.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-[20px] bg-white p-10">
        <p className="text-body text-gray">Корзина пуста</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-1 flex-col gap-3">
      {cartItems.map(item => (
        <CartItemCard key={`${item.productId}_${item.offerId}`} productSlug={item.productId} offerId={item.offerId} />
      ))}
    </ul>
  );
}
