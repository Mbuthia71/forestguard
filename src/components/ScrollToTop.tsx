import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Always scroll to top on route change
    // Ignore hash navigation completely
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // On initial load, force scroll to top regardless of hash
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    } else if (pathname === '/') {
      // When navigating to home, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
