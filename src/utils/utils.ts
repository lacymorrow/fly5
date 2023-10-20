export const generateRandom = (max: number) => Math.floor(Math.random() * max);

export const incrementNumber = (number: number, max: number) => (number + 1) % max;

// Format strings with %s
export const strFormat = (str: string, ...args: any) => args.reduce((s: string, v: string) => s.replace('%s', v), str);

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  // Grab the prefers reduced media query.
  const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
};
