'use client';

import { Percent } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CartSummaryProps {
  /** Количество товаров */
  itemsCount: number;
  /** Общая сумма без скидки */
  totalSum: number;
}

export function CartSummary({ itemsCount, totalSum }: CartSummaryProps) {
  const [isAgreed, setIsAgreed] = useState(false);

  // Мок-данные для скидки
  const currentDiscountPercent = 5;
  const nextDiscountPercent = 8;
  const amountToNextDiscount = 3250;
  const discountAmount = totalSum * (currentDiscountPercent / 100);
  const finalSum = totalSum - discountAmount;

  // Склонение слова "товар"
  const getItemsWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'товаров';
    if (lastDigit === 1) return 'товар';
    if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
    return 'товаров';
  };

  return (
    <aside className="sticky top-5 flex w-full max-w-[352px] flex-col gap-5 rounded-[20px] bg-white p-6">
      {/* Заголовок */}
      <h3 className="text-h3 text-black">Ваш заказ</h3>

      {/* Блок скидки */}
      <div className="flex items-center justify-between gap-4 rounded-[10px] bg-background p-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-catalog text-black">
            До скидки <span className="text-blue">{nextDiscountPercent}%</span>
          </span>
          <span className="text-description text-gray">Осталось {amountToNextDiscount.toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white">
          <Percent className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      {/* Переключатель "Срочный заказ" (мок, disabled) */}
      <div className="flex items-center justify-between gap-4 rounded-[10px] border border-stroke p-4">
        <div className="flex items-center gap-2">
          <span className="text-catalog text-black">Срочный заказ:</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-stroke text-[12px] text-gray">
            ?
          </span>
        </div>
        <div className="h-6 w-11 rounded-full bg-stroke opacity-50" />
      </div>

      {/* Количество товаров и сумма */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-catalog text-black">
          {itemsCount} {getItemsWord(itemsCount)}
        </span>
        <span className="text-body-bold text-black">
          {totalSum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
        </span>
      </div>

      {/* Разделитель */}
      <div className="h-px bg-stroke" />

      {/* Скидка */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-catalog text-black">Общая скидка:</span>
          <span className="text-body-bold text-blue">
            {discountAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-description text-gray">Ссылка на страницу Скидки</span>
          <Link href="/skidki" className="text-price text-blue transition-colors hover:text-blue-active">
            Подробнее
          </Link>
        </div>
      </div>

      {/* Разделитель */}
      <div className="h-px bg-stroke" />

      {/* Итого */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-body-bold text-black">Всего:</span>
          <span className="text-h3 text-black">
            {finalSum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
          </span>
        </div>
        <span className="text-description text-gray">В том числе НДС 20%</span>
      </div>

      {/* Чекбокс согласия */}
      <label className="flex cursor-pointer items-start gap-3">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={e => setIsAgreed(e.target.checked)}
            className="peer sr-only"
          />
          <div className="flex h-5 w-5 items-center justify-center rounded border border-stroke bg-white transition-colors peer-checked:border-blue peer-checked:bg-blue">
            {isAgreed && (
              <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-description text-gray">
          Я согласен на обработку персональных данных в соответствии с{' '}
          <Link href="/politika-konfidentsialnosti" className="text-blue hover:text-blue-active">
            политикой обработки персональных данных компании
          </Link>
        </span>
      </label>

      {/* Кнопка оформления */}
      <button
        type="button"
        disabled={!isAgreed || itemsCount === 0}
        className="w-full rounded-[10px] bg-blue px-5 py-4 text-body-bold text-white transition-colors hover:bg-blue-active disabled:cursor-not-allowed disabled:opacity-50"
      >
        Оформить заказ
      </button>
    </aside>
  );
}
