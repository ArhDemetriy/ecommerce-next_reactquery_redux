import type { Metadata } from 'next';
import { ProductsGrid } from '@/1_widgets/ProductsGrid';

export const metadata: Metadata = {
  title: 'ЕКАПАК | Производство гибкой пластиковой упаковки',
};

export default function Home() {
  return <ProductsGrid />;
}
