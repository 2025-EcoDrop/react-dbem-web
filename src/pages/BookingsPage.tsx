import { useEffect, useState } from 'react';
import styles from '../styles/pages/BookingsPage.module.css';
import BookingCard from '../components/booking/BookingCard';
import { getMyBookings } from '../apis/bookingApi';
import { Booking } from '../types/Booking';
import BookingCard2 from '../components/booking/BookingCard2';

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

const BookingsPage = () => {
    const [activeTab, setActiveTab] = useState<TabStatus>('requesting');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const statusNumber = statusMap[activeTab];
            try {
                const res = await getMyBookings(statusNumber);
                console.log(res);
                setBookings(res);
                setLoading(true);
            } catch (e: any) {
                setBookings([]);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [activeTab]);

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
                {!loading ? (
                    <p className={styles.empty}>불러오는 중...</p>
                ) : bookings.length > 0 ? (
                    activeTab === 'requesting' || activeTab === 'accepted' || activeTab ==='completed' ? (
                        bookings.map((booking) => 
                            <BookingCard key={booking.id} booking={booking} onDelete={handleDeleteBooking} />)
                    ) : (
                        bookings.map((booking) => 
                            <BookingCard2 key={booking.id} booking={booking} onDelete={handleDeleteBooking} onActiveTab={handleTabStatus} />)
                    )
                ) : (
                    <p className={styles.empty}>해당 예약이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;