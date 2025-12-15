import { infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { PartialBy } from '../lib';
import type { PathParams, QueryParams } from './api';
import { requestClient } from './client';

/**
 * Query options для получения всех категорий
 */
export function categoriesOptions() {
  return queryOptions({
    queryKey: [{ name: 'categories', required: {}, optional: {} }] as const,
    queryFn: async () => {
      const { data, error } = await requestClient.GET('/api/categories');
      if (error) throw new Error('Не удалось получить категории');
      if (!data.data) throw new Error('Не получены данные категорий');
      return data.data;
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
      if (!idOrSlug) throw new Error('Не указан id или slug категории');
      const { data, error } = await requestClient.GET('/api/categories/{idOrSlug}', {
        params: { path: { idOrSlug } },
      });
      if (error) throw new Error(`Не удалось получить категорию: ${idOrSlug}`);
      if (!data.data) throw new Error('Не получены данные категории');
      return data.data;
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
      if (error) throw new Error('Не удалось получить товары');
      if (!data.data) throw new Error('Не получены данные товаров');
      return data; // Возвращаем с meta для отображения пагинации
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
      if (error) throw new Error('Не удалось получить товары');
      if (!data.data) throw new Error('Не получены данные товаров');
      return data; // Возвращаем с meta для определения следующей страницы
    },
    initialPageParam: page,
    getNextPageParam: lastPage => {
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
      if (error) throw new Error(`Не удалось получить товар: ${uuid}`);
      if (!data.data) throw new Error('Не получены данные товара');
      return data.data;
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
      if (error) throw new Error(`Не удалось получить товар по slug: ${slug}`);
      if (!data.data) throw new Error('Не получены данные товара');
      return data.data;
    },
    enabled: Boolean(slug),
    placeholderData: keepPreviousData,
  });
}
