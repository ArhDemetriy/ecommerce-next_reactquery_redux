'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { productsInfiniteOptions } from '@/4_shared/query';

import { ProductCard } from './ProductCard';

interface ProductsGridClientProps {
  /** UUID категории для фильтрации */
  category?: string;
  /** Номер страницы (по умолчанию 1) */
  page?: number;
}

function useProductsInfiniteQuery({ category, page }: ProductsGridClientProps) {
  return useSuspenseInfiniteQuery(productsInfiniteOptions({ category, page }));
}

export function NextPageButton(props: ProductsGridClientProps) {
  const productsInfiniteQuery = useProductsInfiniteQuery(props);
  if (!productsInfiniteQuery.hasNextPage) return null;
  return (
    <button
      onClick={() => productsInfiniteQuery.fetchNextPage()}
      className="mt-3 w-full rounded-[10px] bg-blue px-5 py-3.5 text-price leading-[1.4] font-bold text-white transition-colors hover:bg-blue-active md:text-body-bold"
    >
      Показать ещё
    </button>
  );
}

function useProducts(props: ProductsGridClientProps) {
  const productsInfiniteQuery = useProductsInfiniteQuery(props);
  const products = useMemo(
    () => productsInfiniteQuery.data.pages.flatMap(page => page?.data ?? []).filter(Boolean),
    [productsInfiniteQuery.data.pages]
  );
  return products;
}

export function ProductsGridClient(props: ProductsGridClientProps) {
  return useProducts(props).map(product => <ProductCard key={product.uuid} {...product} />);
}

export function ProductsGridEmptyMessageClient(props: ProductsGridClientProps) {
  if (useProducts(props).length) return null;
  return <div className="text-body text-gray">Товары не найдены</div>;
}
