import { Breadcrumb } from '@/types/product';

interface BreadcrumsProps {
  breadcrums?: Breadcrumb[] | undefined
}

export const Breadcrums = ({ breadcrums }: BreadcrumsProps) => {

  return (
    <div className="pb-8 flex flex-wrap gap-2 text-sm">
      {breadcrums === undefined ? <div className="h-3 bg-gray-200 rounded w-28" /> : breadcrums?.map((breadcrum, index) => (
        <div key={index} className="gap-2">
          <span>{breadcrum.category.name}</span>
          <span>{index < (breadcrums.length - 1) ? ' > ' : ''}</span>
        </div>
      ))}
    </div>
  );
};
