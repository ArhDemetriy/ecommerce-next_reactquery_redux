import { Header } from '@/1_widgets/Header';
import { CategoriesList } from '@/1_widgets/CategoriesList/CategoriesList';

export default function HeaderLayout({
  children,
  hero,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-5 py-5">
      <Header />
      {hero}
      <div className="flex items-start gap-5">
        <CategoriesList />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
