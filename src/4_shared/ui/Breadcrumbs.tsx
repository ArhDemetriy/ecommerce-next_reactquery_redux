import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;
  return (
    <nav className="flex items-center gap-2.5">
      {items.map((item, index) => {
        const isLast = index >= lastIndex;
        return (
          <div key={item.label} className="flex items-center gap-2.5">
            {index > 0 && <span className="text-body text-black">/</span>}
            {isLast || !item.href ? (
              <span className="rounded bg-blue-active px-2.5 py-1 text-description text-white">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="rounded bg-white px-2.5 py-1 text-description text-black transition-colors hover:bg-background"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
