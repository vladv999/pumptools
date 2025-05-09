'use client';

import { useState, useEffect } from 'react';
import PreloaderImage from '../../assets/images/preloader.svg';

export default function Preloader() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setLoading(false);

        if (document.readyState === 'complete') {
            setLoading(false);
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    if (!loading) return null;

    return(
        <div className="preloader">
            <img src={PreloaderImage.src} alt="Preloader" />
        </div>
    )
}