import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { categoriesOptions, getQueryClient } from '@/4_shared/query';
import { Skeleton } from '@/4_shared/ui';

import { CategoriesListClient } from './CategoriesListClient';

export function CategoriesList() {
  return (
    <Suspense fallback={<Skeleton className="min-h-40" />}>
      <CategoriesListLoader />
    </Suspense>
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
