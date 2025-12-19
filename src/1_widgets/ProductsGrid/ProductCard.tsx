import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  slug: string;
}

export function ProductCard({ name, price, imageUrl, slug }: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="flex h-full flex-col bg-white border border-stroke rounded-[10px] overflow-hidden"
    >
      <div className="p-[19px]">
        <div className="relative aspect-square w-full rounded-[6px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 163px, 247px"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-4 pb-4 gap-2.5">
        <p className="text-catalog text-black text-center leading-[1.4]">{name}</p>
        <p className="text-price text-blue text-center leading-[1.4] whitespace-nowrap">
          От {price} ₽
        </p>
      </div>
    </Link>
  );
}

