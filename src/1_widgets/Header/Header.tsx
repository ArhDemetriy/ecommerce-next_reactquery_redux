import clsx from 'clsx';
import { Menu, Phone, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex flex-col gap-4 overflow-hidden rounded-[10px] bg-white px-5 py-5 sm:gap-5 sm:rounded-[20px] sm:px-7.5">
      {/* Строка 1: Десктопная верхняя (контакты) */}
      <div className="hidden items-center justify-between gap-7.5 sm:flex">
        <a href="https://go.2gis.com/EjM1M" target="_blank" className="flex items-center gap-2.5">
          <Image src="/MapPin.svg" alt="Location" width={20} height={20} className="size-5 shrink-0" />
          <span className="text-description text-black">г. Екатеринбург, ул. Старых Большевиков, 2А/2</span>
        </a>

        <div className="flex items-center gap-4">
          <a href="info@ekapak.ru" type="email" target="_blank" className="flex items-center gap-2">
            <Image src="/Mail.svg" alt="Email" width={20} height={20} className="size-5 shrink-0" />
            <span className="text-description text-black">info@ekapak.ru</span>
          </a>
          {/* Social icons placeholder */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/79068139777"
              target="_blank"
              className="flex size-5 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            >
              <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
            </a>
            <a
              href="https://t.me/your_telegram_username"
              target="_blank"
              className="flex size-5 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            >
              <Image src="/telegramm.svg" alt="Telegram" width={20} height={20} />
            </a>
          </div>

          <div className="flex items-center gap-5 text-body-bold text-black">
            <a href="tel:+79068139777" type="phone">
              +7 (906) 813-97-77
            </a>
            <a href="tel:+79068136333" type="phone">
              +7 (906) 813-63-33
            </a>
          </div>
        </div>
      </div>

      {/* Строка 2: Мобильная верхняя (Logo + иконки) */}
      <div className="flex items-center justify-between gap-2.5 sm:hidden">
        <Logo />
        <div className="flex items-center gap-2.5">
          <a
            href="info@ekapak.ru"
            type="email"
            target="_blank"
            className="flex size-[39px] items-center justify-center rounded bg-background text-black"
          >
            <Image src="/Mail.svg" alt="Email" width={20} height={20} className="size-5" />
          </a>
          <IconButton icon={<Phone className="size-5" />} />
          <IconButton icon={<Menu className="size-4" />} />
        </div>
      </div>

      {/* Строка 3: Основная (SearchBar в центре) */}
      <div className="flex items-center justify-between gap-7.5">
        {/* Левая часть - только desktop */}
        <Logo className="hidden sm:flex" />
        <Link href="/products" className="hidden items-center gap-2.5 rounded-[10px] bg-background px-5 py-3.5 sm:flex">
          <Image src="/Filter.svg" alt="Filter" width={24} height={24} className="size-6 shrink-0" />
          <span className="text-body-bold text-black">Каталог</span>
        </Link>

        {/* SearchBar - ОДИН экземпляр */}
        <div className="flex-1 sm:max-w-[521px]">
          <SearchBar />
        </div>

        {/* Правая часть - только desktop */}
        <div className="hidden items-center gap-[30px] sm:flex">
          <NavIcon
            icon={<Image src="/person.svg" alt="User" width={24} height={24} className="size-6 shrink-0" />}
            label="Профиль"
          />
          <NavIcon
            icon={<Image src="/Heart.svg" alt="Heart" width={24} height={24} className="size-6 shrink-0" />}
            label="Избранное"
          />
          <NavIcon
            icon={<Image src="/bag.svg" alt="ShoppingBag" width={24} height={24} className="size-6 shrink-0" />}
            label="Корзина"
          />
        </div>
        <div className="hidden rounded-[10px] bg-blue px-5 py-3.5 text-body-bold text-white transition-colors hover:bg-blue-active sm:flex">
          Заказать образец
        </div>
      </div>
    </header>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" prefetch={false} className={clsx('flex-shrink-0', className)}>
      <Image src="/Logo.svg" alt="ЕКАПАК" width={153} height={19} className="aspect-[153/19] h-[15px] sm:h-[19px]" />
    </Link>
  );
}

function SearchBar() {
  return (
    <label className="flex items-center gap-2.5 rounded-[10px] border border-stroke px-4 py-2.5 sm:py-4">
      <Search className="size-4 text-gray sm:size-5" />
      <input
        type="text"
        placeholder="Поиск"
        className="flex-1 bg-transparent text-description text-black outline-none placeholder:text-gray"
      />
    </label>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex size-[39px] items-center justify-center rounded bg-background text-black">{icon}</button>
  );
}

function NavIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1.5 text-black">
      {icon}
      <span className="text-description">{label}</span>
    </button>
  );
}
