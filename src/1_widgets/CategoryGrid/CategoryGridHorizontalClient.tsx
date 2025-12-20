'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { categoryOptions } from '@/4_shared/query';

import { CategoryCardHorizontal } from './CategoryCard';

interface CategoryGridHorizontalClientProps {
  /** Slug родительской категории для получения подкатегорий */
  parentSlug: string;
}

export function CategoryGridHorizontalClient({ parentSlug }: CategoryGridHorizontalClientProps) {
  const { data } = useSuspenseQuery(categoryOptions({ idOrSlug: parentSlug }));

  // Получаем подкатегории из данных категории
  const subcategories = data?.children ?? [];

  if (!subcategories.length) {
    return <div className="text-body text-gray">Подкатегории не найдены</div>;
  }

  return subcategories.map(category => <CategoryCardHorizontal key={category.uuid} {...category} />);
}
