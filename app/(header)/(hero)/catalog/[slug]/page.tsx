import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CategoryGridHorizontal } from '@/1_widgets/CategoryGrid';
import { ProductsGrid } from '@/1_widgets/ProductsGrid';
import { categoriesOptions, categoryOptions } from '@/4_shared/query';
import { getQueryClient } from '@/4_shared/query/getQueryClient';

interface Props {
  slug: string;
}

export const dynamicParams = true;
// export async function generateStaticParams() {
//   return [];

//   // try {
//   //   const queryClient = getQueryClient();

//   //   const allCategories = await queryClient.fetchQuery(categoriesOptions());
//   //   if (!allCategories?.length) return [];

//   //   const uuids: Set<(typeof allCategories)[number]['uuid']> = new Set();
//   //   (function extractSlugs(categories: typeof allCategories) {
//   //     for (const { uuid, children } of categories) {
//   //       if (uuids.has(uuid)) continue;
//   //       uuids.add(uuid);
//   //       if (children?.length) extractSlugs(children);
//   //     }
//   //   })(allCategories);

//   //   return Array.from(uuids).map(uuid => ({ slug: uuid }) satisfies Props);
//   // } catch (error) {
//   //   console.error('Ошибка при генерации статических параметров категорий:', error);
//   //   return [];
//   // }
// }

export async function generateMetadata({ params }: { params: Promise<Props> }) {
  const queryClient = getQueryClient();
  const category = await queryClient.fetchQuery(categoryOptions({ idOrSlug: (await params).slug }));
  if (!category) notFound();

  const { seo_title, seo_description } = category;
  return {
    title: seo_title,
    description: seo_description,
  } satisfies Metadata;
}

export default async function CatalogSlugPage({
  params,
  searchParams,
}: {
  params: Promise<Props>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = (await params) ?? {};
  if (!slug?.length) notFound();

  const queryClient = getQueryClient();
  const category = await queryClient.fetchQuery(categoryOptions({ idOrSlug: slug }));
  if (!category) notFound();

  const isProductPage = !category.children?.length;
  if (!isProductPage) return <CategoryGridHorizontal parentSlug={slug} />;

  const page = Math.max(1, Math.round(parseInt((await searchParams).page ?? '1') || 1));
  return <ProductsGrid category={category.uuid} page={page} />;
}
