import { useState, useEffect, useRef } from 'react';
import { debounce } from 'debounce';

export const useOnScroll = (): boolean => {
    const [isVisible, setIsVisible] = useState(true);
    // Keep and change the previous scroll position in a ref because it's mutable.
    const prevScrollpos = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollpos = window.pageYOffset;

            if (window.pageYOffset >= 90) {
                // Scrolling up:
                // If the previous scroll position is higher than the current scroll position,
                // for example previous is 50 and where you are currently is 40, then it means
                // that the pageYOffset has decreased for your current position.
                // You are getting closer to the top of the page, so you are scrolling up.
                if (prevScrollpos.current > currentScrollpos) {
                    setIsVisible(true);
                    // Scrolling down.
                } else {
                    setIsVisible(false);
                }
            }

            prevScrollpos.current = currentScrollpos;
        };

        // Add debounce, otherwise it will fire the event listener like crazy.
        window.addEventListener('scroll', debounce(handleScroll, 25));

        // Clean up the effect after it finishes and remove the event listener.
        return () => {
            // Add debounce, otherwise it will fire the event listener like crazy.
            window.removeEventListener('scroll', debounce(handleScroll, 25));
        };
    }, []);

    return isVisible;
};
