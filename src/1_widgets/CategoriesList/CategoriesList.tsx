import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { categoriesOptions, getQueryClient } from '@/4_shared/query';
import { Skeleton } from '@/4_shared/ui';

import { CategoriesListClient } from './CategoriesListClient';

export function CategoriesList() {
  return (
    <aside className="hidden w-[352px] shrink-0 rounded-[20px] bg-white p-[30px] sm:block">
      <h2 className="mb-6 text-h3 text-black">Каталог товаров</h2>
      <ul className="flex flex-col gap-2.5">
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesListLoader />
        </Suspense>
      </ul>
    </aside>
  );
}

async function CategoriesListLoader() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(categoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesListClient />
    </HydrationBoundary>
  );
}

function CategoriesListSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border-b border-background py-2.5">
          <Skeleton className="h-5 w-full" />
        </div>
      ))}
    </>
  );
}
