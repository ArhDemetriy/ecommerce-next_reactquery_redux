'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

interface ErrorInfo {
  type: 'cors' | 'network' | 'server' | 'unknown';
  title: string;
  description: string;
}

function getErrorInfo(error: Error): ErrorInfo {
  const message = error.message?.toLowerCase() ?? '';

  // CORS или сетевая ошибка (браузер скрывает детали)
  if (message.includes('failed to fetch') || message.includes('network')) {
    return {
      type: 'cors',
      title: 'Ошибка подключения к серверу',
      description:
        'Не удалось загрузить данные. Возможные причины: блокировка CORS, сервер недоступен или проблемы с сетью.',
    };
  }

  // Ошибки HTTP статусов
  if (message.includes('500') || message.includes('internal server')) {
    return {
      type: 'server',
      title: 'Ошибка сервера',
      description: 'Сервер временно недоступен. Попробуйте позже.',
    };
  }

  if (message.includes('404') || message.includes('not found')) {
    return {
      type: 'server',
      title: 'Данные не найдены',
      description: 'Запрашиваемая категория не существует.',
    };
  }

  if (message.includes('403') || message.includes('forbidden')) {
    return {
      type: 'server',
      title: 'Доступ запрещён',
      description: 'У вас нет прав для просмотра этой категории.',
    };
  }

  return {
    type: 'unknown',
    title: 'Произошла ошибка',
    description: error.message || 'Неизвестная ошибка при загрузке данных.',
  };
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams();
  const slug = params?.slug as string;

  const errorInfo = useMemo(() => getErrorInfo(error), [error]);

  useEffect(() => {
    console.error('Ошибка на странице категории:', {
      slug,
      message: error.message,
      digest: error.digest,
      type: errorInfo.type,
    });
  }, [error, slug, errorInfo.type]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">{errorInfo.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{errorInfo.description}</p>

        {/* Техническая информация для разработчиков */}
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">Техническая информация</summary>
          <div className="mt-2 rounded-lg bg-gray-100 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <p>
              <strong>Категория:</strong> {slug}
            </p>
            <p>
              <strong>Тип ошибки:</strong> {errorInfo.type}
            </p>
            <p>
              <strong>Сообщение:</strong> {error.message}
            </p>
            {error.digest && (
              <p>
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        </details>
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
