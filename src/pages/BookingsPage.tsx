import { useEffect, useRef, useState } from "react";
import styles from "../styles/pages/BookingsPage.module.css";
import { Booking } from "../types/Booking";
import BookingCard from "../components/booking/BookingCard";
import { getBookings } from "../apis/bookingApi";
import { getCities, getDistrict } from "../apis/regionApi";

const PAGE_SIZE = 10;

const BookingsPage = () => {
    const [city, setCity] = useState<string>("전체");
    const [district, setDistrict] = useState<string>("");
    const [town, setTown] = useState<string>("");

    const [cities, setCities] = useState<string[]>(["전체"]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [towns, setTowns] = useState<string[]>([]);

    const [bookings, setBookings] = useState<Booking[]>([]);

    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loader = loaderRef.current;
        if (!loader || !hasMore || loading) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0,
        });

        observer.observe(loader);

        return () => observer.disconnect();
    }, [hasMore, loading, city, district, town, loaderRef.current]);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);

            try {
                let res: Booking[] = [];
                if (city === '전체') {
                    res = await getBookings(page-1, PAGE_SIZE);
                } else if (city && district === "") {
                    res = await getBookings(page-1, PAGE_SIZE, city);
                } else if (city && district && town === "") {
                    res = await getBookings(page-1, PAGE_SIZE, city, district);
                } else if (city && district && town) {
                    res = await getBookings(page-1, PAGE_SIZE, city, district, town);
                }
                if (res.length < PAGE_SIZE) setHasMore(false);
                setBookings(prev => {
                    const merged = [...prev, ...res];
                    const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
                    return unique;
                });
            } catch (error: any) {
                setHasMore(false);
            } finally {
                setLoading(false);
            }
            
        };

        fetchBookings();
    }, [page]);

    useEffect(() => {
        const resetSettings = () => {
            setPage(1);
            setLoading(false);
            setHasMore(true);
            setBookings([]);
        };

        resetSettings();
    }, [city, district, town]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await getCities();
                const cities = res.map((item: { city: string; }) => item.city);
                const sortedCities = [...cities].sort((a, b) => a.localeCompare(b, "ko"));
                setCities(['전체', ...sortedCities]);
            } catch (error: any) {
                console.log(error);
            }
        }

        fetchCities();
    }, []);

    // 1. 시 선택 → 구 목록 불러오기
    useEffect(() => {
        const fetchDistrict = async () => {
            setDistrict("");
            setTown("");
            setDistricts([]);
            setTowns([]);

            if (city === "전체") {
                setCity("전체");
            } else if (city) {
                try {
                    const res = await getDistrict(city);
                    const districts = res.map((item: { district: string; }) => item.district);
                    setDistricts(districts);
                } catch (error: any) {
                    console.log(error);
                }
            }
        }

        fetchDistrict();
    }, [city]);

    // 2. 구 선택 → 동 목록 불러오기
    useEffect(() => {
        setTown("");
        setTowns([]);
        if (city && district) {
            alert("아직 데이터 작업 중...");
        }
    }, [district]);

    const handleAcceptBooking = (id: number) => {
        setBookings(prev =>
            prev.map(booking =>
                booking.id === id
                    ? { ...booking, status: "IN_PROGRESS" }
                    : booking
            )
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>지역별 예약 조회</h2>

            <div className={styles.section}>
                <h3>시 선택</h3>
                <div className={styles.buttonGroup}>
                    {cities.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCity(c)}
                            className={`${styles.button} ${city === c ? styles.buttonActive : ""}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {districts.length > 0 && (
                <div>
                    <h3>구 선택</h3>
                    <div className={styles.buttonGroup}>
                        {districts.map((d) => (
                            <button
                                key={d}
                                onClick={() => setDistrict(d)}
                                className={`${styles.button} ${district === d ? styles.buttonActive : ""}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {towns.length > 0 && (
                <div className={styles.section}>
                    <h3>동 선택</h3>
                    <div className={styles.buttonGroup}>
                        {towns.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTown(t)}
                                className={`${styles.button} ${town === t ? styles.buttonActive : ""}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 예약 리스트 */}
            <h3 className={styles.sectionTitle}>예약 목록</h3>
            <div className={styles.cardContainer}>
                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onAccept={handleAcceptBooking} />
                ))}
                <div
                    ref={loaderRef}
                    style={{
                        height: '10px',
                        margin: '10px auto',
                        background: 'transparent',
                    }}
                />
            </div>
        </div>
    );
};

export default BookingsPage;