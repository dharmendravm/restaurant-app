const borderVariants = {
  Bronze: "hover:border-amber-900",     
  Silver: "hover:border-zinc-400",      
  Gold: "hover:border-yellow-400",       
};



export const Tier = ({ title, range, offer, border}) => (
  <div className={`bg-[#00000040] border  border-gray-900 rounded-lg p-1 px-4 mb-2  transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#1a1a1a]/20 hover:-translate-y-0.5 ${borderVariants[border]}`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-1">{offer}</p>
  </div>
);