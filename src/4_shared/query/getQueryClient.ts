import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * Создает новый QueryClient с настройками по умолчанию
 * Используется как на сервере, так и на клиенте
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // Данные считаются свежими в течение 60 секунд
          staleTime: 60 * 1000,
          // Не перезапрашивать данные при фокусе окна
          refetchOnWindowFocus: false,
          // Повторить запрос один раз при ошибке
          retry: 1,
        },
      },
    })
);
