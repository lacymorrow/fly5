declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }: { action: string; params?: any }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};
