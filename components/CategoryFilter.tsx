"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat || (cat === "All" && !selectedCategory);
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat === "All" ? "" : cat)}
            className={`whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              isSelected
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
