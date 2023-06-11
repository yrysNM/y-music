import React, { useState } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setIsVisible(scrollTop > 0);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Attach the scroll event listener
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            Scroll to Top
        </button>
    );
};

export default ScrollToTop;
