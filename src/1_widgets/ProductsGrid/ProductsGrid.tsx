import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getQueryClient, productsOptions } from '@/4_shared/query';
import { Skeleton } from '@/4_shared/ui';

import { ProductsGridClient, ProductsGridEmptyMessageClient } from './ProductsGridClient';

interface ProductsGridProps {
  category?: string;
}

export function ProductsGrid({ category }: ProductsGridProps) {
  return (
    <div className="rounded-[10px] bg-white p-5 sm:rounded-[20px] sm:p-[30px]">
      <Suspense fallback={null}>
        <ProductsGridEmptyMessageClient category={category} />
      </Suspense>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(163px,1fr))] gap-2.5">
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGridLoader category={category} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsGridLoader({ category }: ProductsGridProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productsOptions({ category }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsGridClient category={category} />
    </HydrationBoundary>
  );
}

function ProductsGridSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col overflow-hidden rounded-[10px] border border-stroke bg-white">
          <div className="p-[19px]">
            <Skeleton className="aspect-square w-full rounded-[6px]" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 px-4 pb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </>
  );
}
