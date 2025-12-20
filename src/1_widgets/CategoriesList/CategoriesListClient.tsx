'use client';

import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import type { ApiResponse } from '@/4_shared/api';
import { categoriesOptions } from '@/4_shared/query';

export function CategoriesListClient() {
  return useSuspenseQuery(categoriesOptions()).data?.map(category => (
    <CategoryItem key={category.uuid} category={category} />
  ));
}

function CategoryItem({ category }: { category: ApiResponse<'/api/categories'>['data'][number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLLIElement>(null);
  const hasChildren = Boolean(category.children?.length);

  return (
    <li ref={anchorRef} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="relative">
      <Link
        href={`/catalog/${category.uuid}`}
        className={clsx(
          'flex w-full items-center justify-between border-b border-background py-2.5 text-catalog transition-colors',
          isOpen ? 'text-blue-active' : 'text-black'
        )}
      >
        <span className="truncate">{category.name}</span>
        {hasChildren && (
          <ChevronRight
            size={30}
            className={clsx('shrink-0 transition-colors', isOpen ? 'text-blue-active' : 'text-black')}
          />
        )}
      </Link>

      {hasChildren && (
        <Popup
          open={isOpen}
          anchor={anchorRef.current}
          placement="right-start"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="flex w-[416px] flex-col rounded-[10px] border border-stroke bg-white px-1 py-[22px] shadow-lg">
            {category.children?.map(sub => (
              <li key={sub.uuid}>
                <Link
                  href={`/catalog/${sub.uuid}`}
                  className="block truncate rounded-[10px] bg-white px-4 py-2 text-catalog transition-colors hover:bg-background"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </Popup>
      )}
    </li>
  );
}
