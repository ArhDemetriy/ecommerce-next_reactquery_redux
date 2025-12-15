import clsx from 'clsx';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-[linear-gradient(to_bottom_right,transparent,rgb(156_163_175),transparent)]',
        className
      )}
    />
  );
}
