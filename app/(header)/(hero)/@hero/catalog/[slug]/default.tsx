import { HeroBanner } from '@/1_widgets/HeroBanner';
import { Breadcrumbs } from '@/4_shared/ui';

export default function CatalogSlugHeroDefault() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]} />
      <HeroBanner />
    </>
  );
}
