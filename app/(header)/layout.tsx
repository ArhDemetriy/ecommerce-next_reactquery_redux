import { Header } from '@/1_widgets/Header';

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-5 py-5">
      <Header />
      {children}
    </div>
  );
}
