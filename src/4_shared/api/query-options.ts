import { queryOptions } from '@tanstack/react-query';

import { requestClient } from './client';

/**
 * Query options для получения всех категорий
 */
export function categoriesOptions() {
  return queryOptions({
    queryKey: [{ name: 'ekapak-categories', required: {}, optional: {} }] as const,
    queryFn: async () => {
      const { data, error } = await requestClient.GET('/api/categories');
      if (error) throw new Error('Не удалось получить категории');
      if (!data) throw new Error('Не получены данные категорий');
      return data;
    },
  });
}

/**
 * Query options для получения категории по uuid или slug
 */
export function categoryOptions({ id }: { id: string | null | undefined }) {
  return queryOptions({
    queryKey: [{ name: 'ekapak-category', required: { id }, optional: {} }] as const,
    queryFn: async () => {
      if (!id) throw new Error('Не указан id категории');
      const { data, error } = await requestClient.GET('/api/categories/{id}', {
        params: { path: { id } },
      });
      if (error) throw new Error(`Не удалось получить категорию: ${id}`);
      if (!data) throw new Error('Не получены данные категории');
      return data;
    },
    enabled: Boolean(id),
  });
}

/**
 * Query options для получения всех товаров с опциональной фильтрацией по категории
 */
export function productsOptions({ category }: { category?: string } = {}) {
  return queryOptions({
    queryKey: [{ name: 'ekapak-products', required: {}, optional: { category } }] as const,
    queryFn: async () => {
      const { data, error } = await requestClient.GET('/api/products', {
        params: { query: category ? { category } : undefined },
      });
      if (error) throw new Error('Не удалось получить товары');
      if (!data) throw new Error('Не получены данные товаров');
      return data;
    },
  });
}

/**
 * Query options для получения товара по uuid
 */
export function productByUuidOptions({ uuid }: { uuid: string | null | undefined }) {
  return queryOptions({
    queryKey: [{ name: 'ekapak-product-uuid', required: { uuid }, optional: {} }] as const,
    queryFn: async () => {
      if (!uuid) throw new Error('Не указан uuid товара');
      const { data, error } = await requestClient.GET('/api/products/{uuid}', {
        params: { path: { uuid } },
      });
      if (error) throw new Error(`Не удалось получить товар: ${uuid}`);
      if (!data) throw new Error('Не получены данные товара');
      return data;
    },
    enabled: Boolean(uuid),
  });
}

/**
 * Query options для получения товара по slug
 */
export function productBySlugOptions({ slug }: { slug: string | null | undefined }) {
  return queryOptions({
    queryKey: [{ name: 'ekapak-product-slug', required: { slug }, optional: {} }] as const,
    queryFn: async () => {
      if (!slug) throw new Error('Не указан slug товара');
      const { data, error } = await requestClient.GET('/api/products/slug/{slug}', {
        params: { path: { slug } },
      });
      if (error) throw new Error(`Не удалось получить товар по slug: ${slug}`);
      if (!data) throw new Error('Не получены данные товара');
      return data;
    },
    enabled: Boolean(slug),
  });
}
