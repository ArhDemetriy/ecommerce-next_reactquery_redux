import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductCartControl } from '@/2_features/ProductCartControl';
import type { ApiResponse } from '@/4_shared/api';

export function ProductCard(props: ApiResponse<'/api/products'>['data'][number]) {
  // Извлечение данных из props
  const offer = props.offers?.[0];
  const unitPrice = parseFloat(offer?.price || '0');
  const unit = offer?.unit || 'шт.';

  const countStep = parseInt(props['Мин. покупка, шт.'] || '1');

  const imageUrl = props.images?.[0]?.card_url || '/placeholder.png';
  const article = props.article || '';
  const name = props.name || '';
  const isInStock = props['Наличие'] === 'Да в наличии';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[10px] bg-white md:rounded-[20px]">
      {/* Изображение товара */}
      <Link href={`/product/${props.slug}`} className="relative block p-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-[6px]">
          <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(max-width: 768px) 142px, 222px" />
        </div>
        {/* Иконка избранного */}
        <button
          type="button"
          className="absolute top-7 right-7 flex h-6 w-6 items-center justify-center"
          onClick={e => {
            e.preventDefault();
            console.log('Избранное:', props.slug);
          }}
        >
          <Heart className="h-6 w-6 text-blue" strokeWidth={1.5} />
        </button>
      </Link>

      {/* Информация о товаре */}
      <div className="flex flex-1 flex-col px-5">
        {/* Артикул */}
        <div className="flex items-center gap-1 text-[12px] leading-[1.4] text-gray">
          <span>Арт.</span>
          <span>{article}</span>
        </div>

        {/* Название */}
        <Link href={`/product/${props.slug}`} className="mt-1">
          <h3 className="line-clamp-3 text-catalog leading-[1.4] text-black">{name}</h3>
        </Link>

        {/* Цена и статус наличия */}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 pt-4">
          <span className="text-catalog leading-[1.4] font-bold text-black">
            {unitPrice.toLocaleString('ru-RU')} ₽ / {unit}
          </span>
          <span className="text-catalog leading-[1.4] text-blue">*</span>
          <span className={`text-catalog leading-[1.4] ${isInStock ? 'text-green' : 'text-blue'}`}>
            {isInStock ? 'В наличии' : 'Под заказ'}
          </span>
        </div>
      </div>

      {/* Каунтер и кнопка добавления в корзину */}
      {offer && <ProductCartControl offer={offer} countStep={countStep} product={props} />}
    </article>
  );
}
