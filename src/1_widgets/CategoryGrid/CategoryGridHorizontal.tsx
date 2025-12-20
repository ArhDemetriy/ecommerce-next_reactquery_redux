import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { categoryOptions, getQueryClient } from '@/4_shared/query';
import { Skeleton } from '@/4_shared/ui';

import { CategoryGridHorizontalClient } from './CategoryGridHorizontalClient';

interface CategoryGridHorizontalProps {
  /** Slug родительской категории для получения подкатегорий */
  parentSlug: string;
}

export function CategoryGridHorizontal({ parentSlug }: CategoryGridHorizontalProps) {
  return (
    <div className="rounded-[10px] bg-white p-5 sm:rounded-[20px] sm:p-[30px]">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        <Suspense fallback={<CategoryGridHorizontalSkeleton />}>
          <CategoryGridHorizontalLoader parentSlug={parentSlug} />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryGridHorizontalLoader({ parentSlug }: CategoryGridHorizontalProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(categoryOptions({ idOrSlug: parentSlug }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryGridHorizontalClient parentSlug={parentSlug} />
    </HydrationBoundary>
  );
}

function CategoryGridHorizontalSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex items-center overflow-hidden rounded-[10px] border border-stroke bg-white">
          {/* Текстовый блок слева */}
          <div className="flex flex-1 flex-col gap-2.5 py-[15px] pl-[21px] md:py-[26px] md:pl-[30px]">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>
          {/* Изображение справа */}
          <div className="flex-shrink-0 p-1 md:p-2.5">
            <Skeleton className="h-[74px] w-[74px] rounded-[6px] md:h-[83px] md:w-[83px]" />
          </div>
        </div>
      ))}
    </>
  );
}
