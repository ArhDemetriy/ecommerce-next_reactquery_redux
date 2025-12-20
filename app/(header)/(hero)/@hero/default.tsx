import { HeroBanner } from '@/1_widgets/HeroBanner';
import { Breadcrumbs } from '@/4_shared/ui';

export default function HeroDefault() {
  return (
    <>
      <div className="sm:hidden">
        <Breadcrumbs items={[{ label: 'Главная' }]} />
      </div>
      <HeroBanner />
    </>
  );
}
