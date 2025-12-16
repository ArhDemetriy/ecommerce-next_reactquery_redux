'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { categoriesOptions } from '@/4_shared/query';

export function CategoriesListClient() {
  const { data: categories } = useSuspenseQuery(categoriesOptions());

  if (!categories?.length) {
    return <div>Категории не найдены</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Категории</h1>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.uuid} className="text-lg">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
