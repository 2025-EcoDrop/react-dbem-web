
import { useEffect, useState } from 'react';

export const useKakaoLoader = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (window.kakao) {
            setLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false&libraries=services`;
        script.async = true;

        document.head.appendChild(script);        

        script.onload = () => {
            window.kakao.maps.load(() => {
                setLoaded(true);
                console.log('Kakao Map SDK loaded');
            });
        };
    }, []);

    return loaded;
};
