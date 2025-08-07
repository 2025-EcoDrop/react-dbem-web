import { useEffect, useRef, useState } from "react";
import styles from "../styles/pages/MainPage.module.css";
import { useKakaoLoader } from "../hooks/useKakaoLoader";

const categories = [
    { code: "PM9", name: "약국" },
    { code: "PO3", name: "주민센터" },
    { code: "HP8", name: "보건소" },
];

const MainPage = () => {
    const loaded = useKakaoLoader();
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [searchAddress, setSearchAddress] = useState("");

    useEffect(() => {
        if (!loaded) return;

        const initMap = (lat: number, lng: number) => {
            const center = new window.kakao.maps.LatLng(lat, lng);
            const mapOption = { center, level: 3 };
            const newMap = new window.kakao.maps.Map(mapRef.current, mapOption);

            new window.kakao.maps.Marker({ map: newMap, position: center });
            setMap(newMap);
            searchPlaces(center, newMap);
        };

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                initMap(lat, lng);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (err) => {
                alert("위치 접근에 실패했습니다.");
                initMap(37.554722, 126.970833);
            }
        );
    }, [loaded]);

    const handleAddressSearch = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchAddress, (result: any, status: string) => {
            if (status === "OK") {
                const lat = parseFloat(result[0].y);
                const lng = parseFloat(result[0].x);
                const newCenter = new window.kakao.maps.LatLng(lat, lng);

                map.setCenter(newCenter);
                searchPlaces(newCenter, map);
            }
        });
    };

    const searchPlaces = (center: any, map: any) => {
        const places = new window.kakao.maps.services.Places();

        categories.forEach((cat) => {
            places.categorySearch(cat.code, (results: any, status: string) => {
                if (status === "OK") {
                    results.forEach((place: any) => {
                        const pos = new window.kakao.maps.LatLng(place.y, place.x);

                        const marker = new window.kakao.maps.Marker({
                            map,
                            position: pos,
                            title: place.place_name,
                        });

                        const iwContent = `
                            <div style="min-width: 200px; padding:6px 10px; font-size:13px;">
                                <strong style="margin:0px 0px 10px 0px;">${place.place_name}</strong><br/>
                                ${place.road_address_name || place.address_name}<br/>
                                <button style="margin:6px 0px 0px 0px;" onclick="window.open('https://map.kakao.com/?sName=${encodeURIComponent(
                                    "내 위치"
                                )}&eName=${encodeURIComponent(place.place_name)}', '_blank')">
                                        길찾기
                                </button>
                            </div>`;

                        const infowindow = new window.kakao.maps.InfoWindow({
                            content: iwContent,
                            removable: true,  // 닫기 버튼 생기고 기본 스타일 일부 제거됨
                            disableAutoPan: true,
                        });

                        (marker as any).isOpen = false;

                        window.kakao.maps.event.addListener(marker, "click", () => {
                            const isOpen = (marker as any).isOpen;

                            if (isOpen) {
                                infowindow.close();
                            } else {
                                infowindow.open(map, marker);
                            }

                            (marker as any).isOpen = !isOpen;
                        });
                    });
                }
            }, { location: center, radius: 1000 });
        });
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>주변 약 수거함 찾기</h2>
            <div className={styles.description}>약국과 주민센터, 보건소 위치를 표시합니다. 표시된 약국과 주민센터, 보건소에는 약 수거함이 없을 수도 있습니다.</div>

            {!loaded ? (
                <p>지도를 불러오는 중입니다...</p>
            ) : (
                <>
                    <div className={styles.container}>
                        <input
                            type="text"
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            placeholder="위치 검색"
                            className={styles.input}
                        />
                        <button onClick={handleAddressSearch} className={styles.button}>검색</button>
                    </div>

                    <div ref={mapRef} className={styles.mapBox} />
                </>
            )}
        </div>
    );
};

export default MainPage;
