'use client';

interface categoryInterface {
  id: number;
  name: string;
}

const CATEGORIES: categoryInterface[] = [
  { id: 18857795, name: 'Apple HomeKit' },
  { id: 18860240, name: 'Philips HUE' },
  { id: 18864728, name: 'Google Assistant' },
  { id: 18893566, name: 'Tuya' },
  { id: 18881647, name: 'Chytré ovládání domácnosti' },
  { id: 18860900, name: 'Chytré spotřebiče' },
  { id: 18885988, name: 'Smart Garden' },
];

export const CategoryFilters = ({ categoryParam, setCategoryParam }) => {

  const handleSelect = (categoryId: number) => {
    setCategoryParam(categoryId);
  };

  return (
    <div className="mb-8 overflow-hidden w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {CATEGORIES.map((category: categoryInterface) => (
          <button
            key={category.id}
            onClick={() => handleSelect(category.id)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
              ${
                categoryParam === category.id
                  ? 'bg-gray-400 text-black hover:bg-primary-hover'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
