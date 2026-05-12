import { categories, ProjectCategory } from '../data/projects';

interface CategoryFilterProps {
  active: ProjectCategory | 'all';
  onChange: (category: ProjectCategory | 'all') => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => (
  <nav
    aria-label="Filter projects by category"
    className="sticky top-0 z-30 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800"
  >
    <ul className="flex justify-center gap-1 sm:gap-6 py-4 px-4 flex-wrap">
      {categories.map((cat) => (
        <li key={cat.key}>
          <button
            type="button"
            onClick={() => onChange(cat.key)}
            className={[
              'text-xs sm:text-sm uppercase tracking-widest px-3 py-2 transition-all duration-300 border-b-2',
              active === cat.key
                ? 'text-white border-white font-bold'
                : 'text-gray-500 hover:text-gray-300 border-transparent',
            ].join(' ')}
          >
            {cat.label}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default CategoryFilter;
