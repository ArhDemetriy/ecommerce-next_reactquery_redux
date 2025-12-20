import type { Metadata } from 'next';

import { CategoryGridVertical } from '@/1_widgets/CategoryGrid';

export const metadata: Metadata = {
  title: 'ЕКАПАК | Производство гибкой пластиковой упаковки',
};

export default function Home() {
  return <CategoryGridVertical />;
}
