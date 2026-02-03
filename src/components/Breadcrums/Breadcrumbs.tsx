import { Breadcrumb } from '@/types/product';

interface BreadcrumbsProps {
  breadcrumbs?: Breadcrumb[] | undefined
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {

  return (
    <div className="pb-8 flex flex-wrap gap-2 text-sm">
      {breadcrumbs === undefined ? <div className="h-3 bg-gray-200 rounded w-28" /> : breadcrumbs?.map((breadcrumb, index) => (
        <div key={index} className="gap-2">
          <span>{breadcrumb.category.name}</span>
          <span>{index < (breadcrumbs.length - 1) ? ' > ' : ''}</span>
        </div>
      ))}
    </div>
  );
};
