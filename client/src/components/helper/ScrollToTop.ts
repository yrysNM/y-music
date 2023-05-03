import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo(10, 10);
  }, [location.pathname]);

  return null;
};

export { ScrollToTop };
