import { HeroBanner } from '@/1_widgets/HeroBanner';
import { Breadcrumbs } from '@/4_shared/ui';

// DEBUG: Версия для отслеживания деплоя
const HERO_BUILD_VERSION = 'hero-v2-' + new Date().toISOString().slice(0, 16);
console.log('[CatalogSlugHeroDefault] Module loaded, BUILD:', HERO_BUILD_VERSION);

export default function CatalogSlugHeroDefault() {
  console.log('[CatalogSlugHeroDefault] Rendering, BUILD:', HERO_BUILD_VERSION);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]} />
      <HeroBanner />
    </>
  );
}
