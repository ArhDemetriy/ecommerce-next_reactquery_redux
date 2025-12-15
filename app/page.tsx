import type { Metadata } from 'next';

import { CategoriesList } from '@/2_widgets/CategoriesList';

export const metadata: Metadata = {
  title: 'Категории | E-commerce',
};

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <CategoriesList />
    </main>
  );
}
