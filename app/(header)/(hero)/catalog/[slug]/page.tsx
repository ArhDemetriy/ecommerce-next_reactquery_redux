import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CategoryGridHorizontal } from '@/1_widgets/CategoryGrid';
import { ProductsGrid } from '@/1_widgets/ProductsGrid';
import { categoryOptions } from '@/4_shared/query';
import { getQueryClient } from '@/4_shared/query/getQueryClient';

// DEBUG: Версия для отслеживания деплоя
const BUILD_VERSION = 'v2-debug-' + new Date().toISOString().slice(0, 16);
console.log('[CatalogSlugPage] Module loaded, BUILD_VERSION:', BUILD_VERSION);

interface Props {
  slug: string;
}

// Принудительно динамический рендеринг — страница использует searchParams
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<Props> }) {
  const slug = (await params).slug;
  console.log('[generateMetadata] START, slug:', slug, 'BUILD:', BUILD_VERSION);

  try {
    const queryClient = getQueryClient();
    const category = await queryClient.fetchQuery(categoryOptions({ idOrSlug: slug }));
    console.log('[generateMetadata] category fetched:', category ? 'OK' : 'NULL');

    if (!category) {
      console.log('[generateMetadata] category is null, calling notFound()');
      notFound();
    }

    const { seo_title, seo_description } = category;
    return {
      title: seo_title,
      description: seo_description,
    } satisfies Metadata;
  } catch (error) {
    console.error('[generateMetadata] ERROR:', error);
    throw error;
  }
}

export default async function CatalogSlugPage({
  params,
  searchParams,
}: {
  params: Promise<Props>;
  searchParams: Promise<{ page?: string }>;
}) {
  console.log('[CatalogSlugPage] START, BUILD:', BUILD_VERSION);

  try {
    const { slug } = (await params) ?? {};
    console.log('[CatalogSlugPage] slug:', slug);

    if (!slug?.length) {
      console.log('[CatalogSlugPage] slug is empty, calling notFound()');
      notFound();
    }

    const queryClient = getQueryClient();
    console.log('[CatalogSlugPage] fetching category...');
    const category = await queryClient.fetchQuery(categoryOptions({ idOrSlug: slug }));
    console.log('[CatalogSlugPage] category fetched:', category ? `OK (uuid: ${category.uuid})` : 'NULL');

    if (!category) {
      console.log('[CatalogSlugPage] category is null, calling notFound()');
      notFound();
    }

    const isProductPage = !category.children?.length;
    console.log('[CatalogSlugPage] isProductPage:', isProductPage);

    if (!isProductPage) {
      console.log('[CatalogSlugPage] rendering CategoryGridHorizontal');
      return <CategoryGridHorizontal parentSlug={slug} />;
    }

    const page = Math.max(1, Math.round(parseInt((await searchParams).page ?? '1') || 1));
    console.log('[CatalogSlugPage] rendering ProductsGrid, page:', page);
    return <ProductsGrid category={category.uuid} page={page} />;
  } catch (error) {
    console.error('[CatalogSlugPage] ERROR:', error);
    throw error;
  }
}
