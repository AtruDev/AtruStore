export const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-surface rounded-2xl overflow-hidden border border-white/5 flex flex-col animate-pulse h-full min-h-[400px]">
      <div className="absolute top-3 right-3 z-10 p-4 bg-slate-800 rounded-full"></div>
      
      <div className="h-56 w-full bg-slate-800"></div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="h-3 w-24 bg-slate-800 rounded mt-2 mb-4"></div>
        <div className="h-6 w-3/4 bg-slate-800 rounded my-1 mb-6"></div>
        
        <div className="flex justify-between items-center mt-auto pt-6">
          <div className="h-8 w-1/3 bg-slate-800 rounded font-sans"></div>
          <div className="h-12 w-12 bg-slate-800 rounded-xl mr-1"></div>
        </div>
      </div>
    </div>
  );
};
