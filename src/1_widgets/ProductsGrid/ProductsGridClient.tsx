'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { productsOptions } from '@/4_shared/query';

import { ProductCard } from './ProductCard';

interface ProductsGridClientProps {
  category?: string;
}

export function ProductsGridClient({ category }: ProductsGridClientProps) {
  const {
    data: { data },
  } = useSuspenseQuery(productsOptions({ category }));
  if (!data?.length) return null;

  return (
    <>
      {data.map(product => {
        const imageUrl = product.images?.[0]?.card_url || '';
        const price = product.offers_min_price || '0';

        return (
          <ProductCard key={product.uuid} name={product.name} price={price} imageUrl={imageUrl} slug={product.slug} />
        );
      })}
    </>
  );
}

export function ProductsGridEmptyMessageClient({ category }: ProductsGridClientProps) {
  const {
    data: { data },
  } = useSuspenseQuery(productsOptions({ category }));
  if (data?.length) return null;
  return <div className="text-body text-gray">Товары не найдены</div>;
}
