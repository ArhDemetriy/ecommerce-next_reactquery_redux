import clsx from 'clsx';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-[linear-gradient(to_bottom_right,transparent,var(--stroke,#d4d4d4),transparent)]',
        className
      )}
    />
  );
}
