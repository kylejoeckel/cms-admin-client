import { useEffect, useState } from "react";

export const useMobile = () => {
    const [mobile, setMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return mobile;
}