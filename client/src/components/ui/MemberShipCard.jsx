import { Gift, Award, Sparkles } from "lucide-react";

const iconMap = {
  "Earn Points": (
    <Gift className="w-5 h-5 text-emerald-300" />
  ),
  "Redeem Points": (
    <Award className="w-5 h-5 text-cyan-300" />
  ),
  "Bonus Points": (
    <Sparkles className="w-5 h-5 text-amber-300" />
  ),
};

const borderVariants = {
  Diamond: "hover:border-cyan-300",
  Ruby: "hover:border-rose-300",
  Emerald: "hover:border-green-300",
};

export const Card = ({ title, value, border }) => (
  <div
    className={`
      bg-[#0f0f0f]/40 border border-white/10 rounded-xl px-4 p-2
      backdrop-blur-xl flex items-center justify-between 
      transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#1a1a1a]/50 hover:-translate-y-0.5
      ${borderVariants[border]}
    `}
  >
    <div className="flex items-center gap-3">
      <div className="opacity-80">{iconMap[title]}</div>
      <h4 className="text-gray-100 text-sm font-medium">{title}</h4>
    </div>

    <p className="text-gray-400 text-xs font-normal">{value}</p>
  </div>
);
