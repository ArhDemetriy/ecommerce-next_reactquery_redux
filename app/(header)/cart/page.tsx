import type { Metadata } from 'next';

import { CartPageContent } from '@/1_widgets/Cart';
import { Breadcrumbs } from '@/4_shared/ui';

export const metadata: Metadata = {
  title: 'ЕКАПАК | Корзина',
};

export default function Cart() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина' }]} />
      <CartPageContent />
    </div>
  );
}
