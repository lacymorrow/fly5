import { useCallback, useEffect, useRef, useState } from 'react';

import { categories, ProjectCategory, projects } from '../data/projects';

interface CategoryFilterProps {
  active: ProjectCategory | 'all';
  onChange: (category: ProjectCategory | 'all') => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });

  const updatePill = useCallback(() => {
    const btn = buttonRefs.current[active];
    const nav = navRef.current;
    if (btn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPill({
        left: btnRect.left - navRect.left,
        top: btnRect.top - navRect.top,
        width: btnRect.width,
        height: btnRect.height,
      });
    }
  }, [active]);

  useEffect(() => {
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  return (
    <nav
      aria-label="Filter projects by category"
      className="sticky top-0 z-30 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800"
    >
      <div
        ref={navRef}
        className="relative flex justify-center gap-1 sm:gap-2 py-4 px-4 flex-wrap"
      >
        <div
          className="absolute bg-white bg-opacity-10 rounded-full pointer-events-none"
          style={{
            left: pill.left,
            top: pill.top,
            width: pill.width,
            height: pill.height,
            transition:
              'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-hidden="true"
        />
        {categories.map((cat) => {
          const count =
            cat.key === 'all'
              ? projects.length
              : projects.filter((p) => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              ref={(el) => {
                buttonRefs.current[cat.key] = el;
              }}
              type="button"
              onClick={() => onChange(cat.key)}
              className={[
                'relative z-10 text-xs uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer',
                'transition-colors duration-200',
                'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50 focus-visible:outline-none',
                active === cat.key
                  ? 'text-white font-semibold'
                  : 'text-gray-500 hover:text-gray-300',
              ].join(' ')}
              aria-pressed={active === cat.key}
            >
              {cat.label}
              <span className="ml-1 text-xs opacity-40">{count}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryFilter;
