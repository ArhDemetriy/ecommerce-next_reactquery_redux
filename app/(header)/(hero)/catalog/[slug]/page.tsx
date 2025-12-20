import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CategoryGridHorizontal } from '@/1_widgets/CategoryGrid';
import { ProductsGrid } from '@/1_widgets/ProductsGrid';
import { categoryOptions } from '@/4_shared/query';
import { getQueryClient } from '@/4_shared/query/getQueryClient';

interface Props {
  slug: string;
}

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
  // try {
  //   const queryClient = getQueryClient();

  //   const allCategories = await queryClient.fetchQuery(categoriesOptions());
  //   const slugs: Set<(typeof allCategories)[number]['slug']> = new Set();
  //   (function extractSlugs(categories: typeof allCategories) {
  //     for (const { slug, children } of categories) {
  //       if (slugs.has(slug)) continue;
  //       slugs.add(slug);
  //       if (children?.length) extractSlugs(children);
  //     }
  //   })(allCategories);

  //   return Array.from(slugs).map(slug => ({ slug }) satisfies Props);
  // } catch (error) {
  //   console.error('Ошибка при генерации статических параметров категорий:', error);
  //   return [];
  // }
}

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
  if (!isProductPage) return <CategoryGridHorizontal parentSlug={category.slug} />;

  const page = Math.max(1, Math.round(parseInt((await searchParams).page ?? '1') || 1));
  return <ProductsGrid category={category.uuid} page={page} />;
}
