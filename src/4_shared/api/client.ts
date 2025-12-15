import createClient from 'openapi-fetch';

import type { paths } from './api';

const BASE_URL = process.env.NEXT_PUBLIC_EKAPAK_API_URL || 'https://api.ekapak.ru';

/**
 * Типизированный клиент для Ekapak API
 * Использует openapi-fetch для автоматической типизации запросов и ответов
 */
export const requestClient = createClient<paths>({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  cache: 'no-store',
});
