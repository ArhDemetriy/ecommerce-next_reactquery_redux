import { CategoriesList } from '@/1_widgets/CategoriesList/CategoriesList';

export default function HeroLayout({
  children,
  hero,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
}>) {
  return (
    <>
      {hero}
      <div className="flex items-start justify-between gap-2.5">
        <CategoriesList />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
