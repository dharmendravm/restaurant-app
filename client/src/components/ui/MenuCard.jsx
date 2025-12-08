import React from "react";
import { IndianRupee } from "lucide-react";


// Props
export const MenuCard = ({
  title,
  subtitle,
  price,
  image,
  badge,
  tagColor = "bg-[#ffe5b4] text-[#8b3a1a]",
}) => {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] border border-[#f3e2d2] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.13)]"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm ${tagColor}`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="px-4 pb-4 pt-3">
        <h3 className="text-sm font-semibold text-[#1b130c] mb-1 line-clamp-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[11px] text-[#8b8278] mb-2 line-clamp-2">{subtitle}</p>
        )}
        <div className="mt-1 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 text-[#f97316]">
            <IndianRupee className="h-3 w-3" />
            <span className="text-sm font-semibold">{price}</span>
          </div>
          <button className="rounded-full bg-[#1b130c] px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#2b1c0f]">
            Add
          </button>
        </div>
      </div>
    </article>
  );
};
