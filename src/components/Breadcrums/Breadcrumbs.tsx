import { Breadcrumb } from '@/types/product';

interface BreadcrumbsProps {
  breadcrumbs?: Breadcrumb[] | undefined
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {

  return (
    <div className="cccccbrfjectegugiutjtfjcuhnillffecgevgrlcldc
    cccccbrfjectinflkrklejibntgjftttjgrelefbehun
    pb-8 flex flex-wrap gap-2 text-sm">
      {Breadcrumbs === undefined ? <div className="h-3 bg-gray-200 rounded w-28" /> : breadcrumbs?.map((breadcrumb, index) => (
        <div key={index} className="gap-2">
          <span>{breadcrumb.category.name}</span>
          <span>{index < (breadcrumbs.length - 1) ? ' > ' : ''}</span>
        </div>
      ))}
    </div>
  );
};
