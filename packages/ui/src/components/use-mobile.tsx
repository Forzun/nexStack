import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint = 768) => {
    const getIsMobile = () => (typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);
    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        const handleResize = () => setIsMobile(getIsMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
