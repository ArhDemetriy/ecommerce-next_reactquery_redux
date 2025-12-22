import { infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { PathParams, QueryParams } from '../api/api';
import { requestClient } from '../api/client';
import type { PartialBy } from '../lib';

/**
 * Query options для получения всех категорий
 */
export function categoriesOptions() {
  return queryOptions({
    queryKey: [{ name: 'categories', required: {}, optional: {} }] as const,
    queryFn: async () => {
      const { data, error } = await requestClient.GET('/api/categories');
      if (error) {
        console.error('Не удалось получить категории');
        return null;
      }
      if (!data.data) console.error('Не получены данные категорий');
      return data.data ?? null;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Query options для получения категории по uuid или slug
 */
export function categoryOptions({ idOrSlug }: PartialBy<PathParams<'/api/categories/{idOrSlug}'>, 'idOrSlug'>) {
  return queryOptions({
    queryKey: [{ name: 'category', required: { idOrSlug }, optional: {} }] as const,
    queryFn: async () => {
      console.log('[categoryOptions] queryFn START, idOrSlug:', idOrSlug);
      if (!idOrSlug) throw new Error('Не указан id или slug категории');

      try {
        const { data, error, response } = await requestClient.GET('/api/categories/{idOrSlug}', {
          params: { path: { idOrSlug } },
        });

        console.log('[categoryOptions] response status:', response?.status, 'ok:', response?.ok);

        if (error) {
          console.error(`[categoryOptions] API error for ${idOrSlug}:`, error);
          return null;
        }
        if (!data.data) console.error('[categoryOptions] No data in response');
        console.log('[categoryOptions] queryFn SUCCESS, data:', data.data ? 'present' : 'null');
        return data.data ?? null;
      } catch (fetchError) {
        console.error('[categoryOptions] FETCH ERROR (network/CORS?):', fetchError);
        throw fetchError;
      }
    },
    enabled: Boolean(idOrSlug),
    placeholderData: keepPreviousData,
  });
}

type ProductsOptionsParams = Omit<PartialBy<QueryParams<'/api/products'>, 'category' | 'page'>, 'per_page'> & {
  /** Количество товаров на странице (по умолчанию 16) */
  perPage?: QueryParams<'/api/products'>['per_page'];
};
/**
 * Query options для получения товаров с классической пагинацией (страницы 1, 2, 3...)
 */
export function productsOptions({ category, page = 1, perPage }: ProductsOptionsParams = {}) {
  return queryOptions({
    queryKey: [{ name: 'products', required: { page }, optional: { category, perPage } }] as const,
    queryFn: async () => {
      const { data, error } = await requestClient.GET('/api/products', {
        params: { query: { category, page, per_page: perPage } },
      });
      if (error) {
        console.error('Не удалось получить товары');
        return null;
      }
      if (!data.data) console.error('Не получены данные товаров');
      return data ?? null; // Возвращаем с meta для отображения пагинации
    },
    placeholderData: keepPreviousData,
  });
}
/**
 * Infinite query options для бесконечной прокрутки товаров
 */
export function productsInfiniteOptions({ category, page = 1, perPage }: ProductsOptionsParams = {}) {
  return infiniteQueryOptions({
    queryKey: [{ name: 'products-infinite', required: {}, optional: { category, perPage } }] as const,
    queryFn: async ({ pageParam }) => {
      const { data, error } = await requestClient.GET('/api/products', {
        params: { query: { category, page: pageParam, per_page: perPage } },
      });
      if (error) {
        console.error('Не удалось получить товары');
        return null;
      }
      if (!data.data) console.error('Не получены данные товаров');
      return data ?? null; // Возвращаем с meta для определения следующей страницы
    },
    initialPageParam: page,
    getNextPageParam: lastPage => {
      if (!lastPage) return;
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });
}

/**
 * Query options для получения товара по uuid
 */
export function productByUuidOptions({ uuid }: PartialBy<PathParams<'/api/products/{uuid}'>, 'uuid'>) {
  return queryOptions({
    queryKey: [{ name: 'product-uuid', required: { uuid }, optional: {} }] as const,
    queryFn: async () => {
      if (!uuid) throw new Error('Не указан uuid товара');
      const { data, error } = await requestClient.GET('/api/products/{uuid}', {
        params: { path: { uuid } },
      });

      if (error) {
        console.error(`Не удалось получить товар: ${uuid}`);
        return null;
      }
      if (!data.data) console.error('Не получены данные товара');
      return data.data ?? null;
    },
    enabled: Boolean(uuid),
    placeholderData: keepPreviousData,
  });
}

/**
 * Query options для получения товара по slug
 */
export function productBySlugOptions({ slug }: PartialBy<PathParams<'/api/products/slug/{slug}'>, 'slug'>) {
  return queryOptions({
    queryKey: [{ name: 'product-slug', required: { slug }, optional: {} }] as const,
    queryFn: async () => {
      if (!slug) throw new Error('Не указан slug товара');
      const { data, error } = await requestClient.GET('/api/products/slug/{slug}', {
        params: { path: { slug } },
      });
      if (error) {
        console.error(`Не удалось получить товар по slug: ${slug}`);
        return null;
      }
      if (!data.data) console.error('Не получены данные товара');
      return data.data ?? null;
    },
    enabled: Boolean(slug),
    placeholderData: keepPreviousData,
  });
}
