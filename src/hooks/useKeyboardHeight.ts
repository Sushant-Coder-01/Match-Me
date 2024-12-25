import { useState, useEffect } from 'react';

export function useKeyboardHeight(): number {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const isKeyboardOpen = window.innerHeight < screen.height * 0.7;
            const heightDiff = screen.height - window.innerHeight;
            setKeyboardHeight(isKeyboardOpen ? heightDiff : 0);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Run initially

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return keyboardHeight;
}
