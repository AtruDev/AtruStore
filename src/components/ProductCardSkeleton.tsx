export const ProductCardSkeleton = () => {
  return (
    <div className="relative flex flex-col">
      <div className="relative rounded-[2rem] overflow-hidden bg-slate-200 dark:bg-white/5 aspect-[4/5] mb-6 flex animate-pulse">
        <div className="absolute inset-0 bg-slate-300 dark:bg-white/10 w-full h-full"></div>
      </div>
      
      <div className="flex flex-col px-2">
        <div className="flex items-start justify-between gap-4 animate-pulse">
          <div className="w-full">
            <div className="h-3 w-16 bg-slate-300 dark:bg-white/10 rounded mb-4"></div>
            <div className="h-6 w-3/4 bg-slate-300 dark:bg-white/10 rounded"></div>
          </div>
          
          <div className="shrink-0 w-12 h-12 bg-slate-300 dark:bg-white/10 rounded-full"></div>
        </div>
        
        <div className="h-6 w-1/3 bg-slate-300 dark:bg-white/10 rounded mt-5 animate-pulse"></div>
      </div>
    </div>
  );
};
