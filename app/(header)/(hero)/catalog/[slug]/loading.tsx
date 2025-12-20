import { Skeleton } from '@/4_shared/ui';

export default function CatalogSlugLoading() {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(182px,1fr))] gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col overflow-hidden rounded-[10px] bg-white">
          <div className="p-[19px]">
            <Skeleton className="aspect-square w-full rounded-[6px]" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2.5 px-4 pb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
