'use client';

export const SortingTabs = ({ sortParam, setSortParam }) => {
  const TABS = ['Nejprodávanější', 'Od nejlevnějšího', 'Od nejdražšího'];

  const handleChange = (index: number) => {
    setSortParam(index);
  };

  return (
    <div className="my-8 border-b border-gray-200">
      <div className="flex space-x-1">
        {TABS.map((label, index) => {
          const isSelected = sortParam === index;
          return (
            <button
              key={index}
              onClick={() => handleChange(index)}
              className={`
                              px-6 py-3 font-medium text-sm transition-colors border-b-2
                ${
                  isSelected
                    ? 'border-primary text-black'
                    : 'border-transparent text-text hover:text-black hover:border-gray-300'
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
