export default function ProductCardSkeleton() {
  return (
    <article
      style={{ height: "546px" }}
      className="flex flex-col h-full p-4 bg-white border border-gray-100 animate-pulse"
    >

      <div className="flex justify-center mb-4 h-48 relative">
        <div className="w-48 h-full bg-gray-200 rounded-md" />
      </div>

      <div className="flex flex-col flex-grow">

        <div className="mb-2 min-h-[3rem]">
          <div className="h-6 bg-gray-200 rounded w-full mb-2" />
        </div>


        <div className="mb-2">
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>


        <div className="mb-2 min-h-[3.75rem]">
          <div className="h-3 bg-gray-200 rounded w-full mb-2" />
          <div className="h-3 bg-gray-200 rounded w-full mb-2" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>


        <div className="h-6 bg-gray-200 rounded w-16 mb-2" />


        <div className="mt-auto mb-2 flex flex-col">
          <div className="h-7 bg-gray-200 rounded w-24 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>

        <div className="flex mb-2">
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>

        <div className="flex justify-end min-h-[1.25rem]">
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </article>
  );
}