import type { Metadata } from 'next';

import { Breadcrumbs } from '@/4_shared/ui';

export const metadata: Metadata = {
  title: 'ЕКАПАК | Корзина',
};

export default function Cart() {
  return (
    <div className="flex w-full flex-col gap-5">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Корзина' }]} />
      <div className="flex justify-between">
        <div className="relative flex items-center justify-start">
          <div className="absolute w-max">Вернуться к покупкам</div>
        </div>
        <h1>Корзина</h1>
        <div></div>
      </div>
      <div className="flex flex-wrap justify-between gap-5">Контент корзины</div>
    </div>
  );
}
