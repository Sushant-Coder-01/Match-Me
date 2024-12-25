import { useState, useEffect } from 'react';

const useKeyboardHeight = (): number => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = window.innerHeight - viewportHeight;
      setKeyboardHeight(heightDifference > 0 ? heightDifference : 0);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    handleResize(); // Run it on load

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;