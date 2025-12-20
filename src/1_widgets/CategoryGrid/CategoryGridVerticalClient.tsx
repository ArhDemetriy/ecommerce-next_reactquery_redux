'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { categoriesOptions } from '@/4_shared/query';

import { CategoryCardVertical } from './CategoryCard';

export function CategoryGridVerticalClient() {
  const { data } = useSuspenseQuery(categoriesOptions());

  if (!data?.length) {
    return <div className="text-body text-gray">Категории не найдены</div>;
  }

  return data.map(category => <CategoryCardVertical key={category.uuid} {...category} />);
}
