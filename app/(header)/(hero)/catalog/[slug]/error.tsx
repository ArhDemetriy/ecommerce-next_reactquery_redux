'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { categoryOptions } from '@/4_shared/query';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    console.error('Ошибка на странице категории:', error);
  }, [error]);

  const { error: queryError } = useQuery(categoryOptions({ idOrSlug: slug }));

  useEffect(() => {
    console.error('Ошибка на странице категории queryError:', queryError);
  }, [queryError]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">Что-то пошло не так</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Произошла ошибка при загрузке категории: <span className="font-medium">{slug}</span>
        </p>
        {error.message && <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">{error.message}</p>}
        {queryError?.message && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            **********
            {queryError.message}
          </p>
        )}
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Попробовать снова
      </button>
    </div>
  );
}
