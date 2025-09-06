import React, { useEffect, useRef, useState } from 'react';
import { useKakaoLoader } from '../../hooks/useKakaoLoader';
import { getRegionFromCoords } from '../../utils/getRegionFromCoords';
import { getBookingById, updateBookingById } from '../../apis/bookingApi';
import styles from '../../styles/pages/booking/BookingFormPage.module.css';
import { getCoordsFromAddress } from '../../utils/getCoordsFromAddress';
import { useNavigate, useParams } from 'react-router-dom';
import { Location, Region } from '../../types/BookingForm';

const BookingEditFormPage = () => {
    const { id } = useParams<{ id:string }>();
    const mapRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState('');
    const [location, setLocation] = useState<Location | null>(null);
    const [region, setRegion] = useState<Region>({
        address: '',
        region_1depth: '',
        region_2depth: '',
        region_3depth: '',
    });
    const kakaoLoaded = useKakaoLoader();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            if (!id) return;

            try {
                const booking = await getBookingById(id);
                setContent(booking.content);
                setRegion({
                    address: booking.address,
                    region_1depth: booking.region_1depth,
                    region_2depth: booking.region_2depth,
                    region_3depth: booking.region_3depth,
                });
                setLocation({
                    latitude: booking.latitude,
                    longitude: booking.longitude,
                });
            } catch (e: any) {
                alert('예약 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchBooking();
    }, [id]);

    useEffect(() => {
        if (!kakaoLoaded || id) return;

        if (!navigator.geolocation) {
            alert('위치 정보가 지원되지 않는 브라우저입니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                setLocation({ latitude, longitude });

                const regionResult = await getRegionFromCoords(latitude, longitude);
                setRegion(regionResult);
            },
            async (err) => {
                console.error('위치 탐지 실패:', err);
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        alert('위치 접근이 거부되었습니다.');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        alert('위치 정보를 사용할 수 없습니다.');
                        break;
                    case err.TIMEOUT:
                        alert('위치 정보 요청 시간이 초과되었습니다.');
                        break;
                    default:
                        alert('알 수 없는 오류입니다.');
                }

                const latitude = 37.5530254;
                const longitude = 126.9726591;
                setLocation({ latitude, longitude });

                const regionResult = await getRegionFromCoords(latitude, longitude);
                setRegion(regionResult);
            }
        );
    }, [kakaoLoaded, id]);

    useEffect(() => {
        if (!kakaoLoaded || !location || !mapRef.current) return;

        const { kakao } = window;

        const map = new kakao.maps.Map(mapRef.current, {
            center: new kakao.maps.LatLng(location.latitude, location.longitude),
            level: 3,
        });

        const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            map,
            draggable: true,
        });

        const updatePosition = async (lat: number, lng: number) => {
            setLocation({ latitude: lat, longitude: lng });

            try {
                const regionResult = await getRegionFromCoords(lat, lng);
                setRegion(regionResult);
            } catch (err) {
                console.error('주소 변환 오류:', err);
            }
        };

        kakao.maps.event.addListener(marker, 'dragend', async () => {
            const position = marker.getPosition();
            await updatePosition(position.getLat(), position.getLng());
        });

        kakao.maps.event.addListener(map, 'click', async (mouseEvent: any) => {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            map.panTo(latlng);
            await updatePosition(latlng.getLat(), latlng.getLng());
        });
    }, [kakaoLoaded, location]);

    useEffect(() => {
        // 주소 중 최소한 시/도, 시/군/구, 읍/면/동 등 조합해서 하나의 문자열 만들기
        const addressString = `${region.region_1depth} ${region.region_2depth} ${region.region_3depth} ${region.address}`.trim();

        if (addressString.length === 0) return; // 주소가 비어있으면 무시

        // 좌표 변환
        const updateCoordsFromAddress = async () => {
            try {
                const coords = await getCoordsFromAddress(addressString);
                setLocation(coords);
            } catch (err) {
             console.error('주소 변환 실패:', err);
            }
        };

        updateCoordsFromAddress();
    }, [region.region_1depth, region.region_2depth, region.region_3depth, region.address]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) return;

        const payload = {
            content: content.trim(),
            address: region.address,
            region_1depth: region.region_1depth,
            region_2depth: region.region_2depth,
            region_3depth: region.region_3depth,
            latitude: location.latitude,
            longitude: location.longitude,
        };

        try {
            console.log(payload);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await updateBookingById(id!, payload);
            alert('약 수거 예약이 수정되었습니다.');
            navigate('/booking/my');
        } catch (err: any) {
            console.error('약 수거 예약 저장 실패:', err);

            if (err.response.data.content) {
                alert(err.response.data.content);
            } else {
                alert('오류 발생: 약 수거 예약 수정에 실패했습니다.');
            }
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <h2 className={styles.title}>약 수거 예약 수정</h2>
            
            <div className={styles.mapWrapper}>
                <div id='map' ref={mapRef} className={styles.mapContainer} />

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        시/도
                        <input
                            type="text"
                            value={region.region_1depth}
                            onChange={(e) => setRegion({ ...region, region_1depth: e.target.value })}
                            onBlur={() => setRegion(
                                { ...region, 
                                    address: region.region_1depth+" "+region.region_2depth+" "+region.region_3depth}
                            )}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        시/군/구
                        <input
                            type="text"
                            value={region.region_2depth}
                            onChange={(e) => setRegion({ ...region, region_2depth: e.target.value })}
                            onBlur={() => setRegion(
                                { ...region, 
                                    address: region.region_1depth+" "+region.region_2depth+" "+region.region_3depth}
                            )}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        읍/면/동
                        <input
                            type="text"
                            value={region.region_3depth}
                            onChange={(e) => setRegion({ ...region, region_3depth: e.target.value })}
                            onBlur={() => setRegion(
                                { ...region, 
                                    address: region.region_1depth+" "+region.region_2depth+" "+region.region_3depth}
                            )}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        상세 주소
                        <input
                            type="text"
                            value={region.address}
                            onChange={(e) => setRegion({ ...region, address: e.target.value })}
                            onBlur={() => {
                                const parts = region.address.trim().split(/\s+/); // 공백 기준 나눔 (여러 공백도 허용)

                                setRegion({
                                    ...region,
                                    region_1depth: parts[0] || '',
                                    region_2depth: parts[1] || '',
                                    region_3depth: parts[2] || '',
                                });
                            }}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        내용
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={styles.content}
                            placeholder="예: 오후 00시에 OOO아파트 000동 000호 문 앞에 약 꺼내둘 예정입니다. 약 대신 버려주실 분 구합니다."
                        />
                    </label>

                    <button type="submit" className={styles.submitButton}>
                        약 수거 예악 수정하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingEditFormPage;
