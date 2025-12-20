import Image from 'next/image';
import Link from 'next/link';

import type { ApiResponse } from '@/4_shared/api';

type CategoryCardProps = ApiResponse<'/api/categories'>['data'][number];

export function CategoryCardVertical({ name, slug, uuid, image_url, min_price }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog/${uuid}`}
      className="flex h-full flex-col overflow-hidden rounded-[10px] border border-stroke bg-white"
    >
      <div className="p-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-[6px]">
          <Image src={image_url} alt={name} fill className="object-cover" sizes="(max-width: 768px) 123px, 207px" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-2.5 px-4 pb-4">
        <p className="text-center text-description leading-[1.4] text-black md:text-catalog">{name}</p>
        <p className="text-center text-price leading-[1.4] whitespace-nowrap text-blue">от {min_price} ₽</p>
      </div>
    </Link>
  );
}

export function CategoryCardHorizontal({ name, slug, uuid, image_url, min_price }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog/${uuid}`}
      className="flex items-center overflow-hidden rounded-[10px] border border-stroke bg-white"
    >
      {/* Текстовый блок слева */}
      <div className="flex flex-1 flex-col gap-2.5 py-[15px] pl-[21px] md:py-[26px] md:pl-[30px]">
        <p className="text-catalog leading-[1.4] text-black">{name}</p>
        <p className="text-price leading-[1.4] text-blue">от {min_price} ₽ / шт.</p>
      </div>

      {/* Изображение справа */}
      <div className="flex-shrink-0 p-1 md:p-2.5">
        <div className="relative h-[74px] w-[74px] overflow-hidden rounded-[6px] md:h-[83px] md:w-[83px]">
          <Image src={image_url} alt={name} fill className="object-cover" sizes="(max-width: 768px) 74px, 83px" />
        </div>
      </div>
    </Link>
  );
}
