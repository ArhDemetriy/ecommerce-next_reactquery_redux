import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { categoriesOptions, getQueryClient } from '@/4_shared/query';
import { Skeleton } from '@/4_shared/ui';

import { CategoryGridVerticalClient } from './CategoryGridVerticalClient';

export function CategoryGridVertical() {
  return (
    <div className="rounded-[10px] bg-white p-5 md:rounded-[20px] md:p-[30px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(246px,1fr))] gap-2.5">
        <Suspense fallback={<CategoryGridSkeleton />}>
          <CategoryGridLoader />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryGridLoader() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(categoriesOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryGridVerticalClient />
    </HydrationBoundary>
  );
}

function CategoryGridSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col overflow-hidden rounded-[10px] bg-white">
          <div className="p-5">
            <Skeleton className="aspect-square w-full rounded-[6px]" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 px-4 pb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </>
  );
}
