import { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/MyBookingsPage.module.css';
import { getMyBookings } from '../apis/bookingApi';
import { Booking } from '../types/Booking';
import MyBookingCard from '../components/booking/MyBookingCard';
import MyBookingCard2 from '../components/booking/MyBookingCard2';

type TabStatus = 'requesting' | 'accepted' | 'completed' | 'i_accepted' | 'i_completed';

const statusMap: Record<TabStatus, string> = {
    requesting: '0',
    accepted: '1',
    completed: '2',
    i_accepted: '3',
    i_completed: '4',
};

const tabs: { key: TabStatus; label: string }[] = [
    { key: 'requesting', label: '신청중' },
    { key: 'accepted', label: '수락됨' },
    { key: 'completed', label: '완료됨' },
    { key: 'i_accepted', label: '수락함' },
    { key: 'i_completed', label: '완료함' },
];

const PAGE_SIZE = 10;

const BookingsPage = () => {
    const [activeTab, setActiveTab] = useState<TabStatus>('requesting');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true); // 더 가져올 게 있는지
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setBookings([]);      // 탭 변경 시 기존 데이터 초기화
        setPage(1);           // 탭 변경 시 첫 페이지로
        setHasMore(true);     // 탭 변경 시 hasMore 초기화
    }, [activeTab]);

    useEffect(() => {
        const fetchBookings = async () => {
            const statusNumber = statusMap[activeTab];

            setLoading(true);
            try {
                const res = await getMyBookings(statusNumber, page-1, PAGE_SIZE);

                if (res.length < PAGE_SIZE) setHasMore(false);
                setBookings(prev => {
                    const merged = [...prev, ...res];
                    // 중복 제거
                    const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
                    return unique;
                });
            } catch (e: any) {
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [activeTab, page]);

    // 무한 스크롤 observer
    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0,
        });

        const loader = loaderRef.current;
        if (loader) {
            observer.observe(loader);
        }

        return () => {
            if (loader) {
                observer.unobserve(loader);
            }
        };
    }, [hasMore, loading]);

    const handleDeleteBooking = (id: number) => {
        setBookings(prev => prev.filter(booking => booking.id !== id));
    }

    const handleTabStatus = () => {
        setActiveTab('i_completed');
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>약 수거 예약 확인</h2>
            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <div
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            <div className={styles.cardContainer}>
                {bookings.length === 0 && loading ? (
                    <p className={styles.empty}>불러오는 중...</p>
                ) : bookings.length > 0 ? (
                    <>
                        {bookings.map((booking) =>
                            activeTab === 'requesting' || activeTab === 'accepted' || activeTab === 'completed' ? (
                                <MyBookingCard key={booking.id} booking={booking} onDelete={handleDeleteBooking} />
                            ) : (
                                <MyBookingCard2 key={booking.id} booking={booking} onDelete={handleDeleteBooking} onActiveTab={handleTabStatus} />
                            )
                        )}

                        {/* 감지용 div */}
                        <div
                            ref={loaderRef}
                            style={{
                                height: '20px',
                                margin: '20px auto',
                                background: 'transparent',
                            }}
                        />

                        {loading && <p className={styles.loadingText}>불러오는 중...</p>}
                    </>
                ) : (
                    <p className={styles.empty}>해당 예약이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;