import { useEffect, useState } from 'react';
import { acceptBookingById } from '../../apis/bookingApi';
import styles from '../../styles/components/BookingCard.module.css';
import { Booking } from '../../types/Booking';
import { Location } from '../../types/BookingForm';

interface BookingCardProps {
    booking: Booking;
    onAccept: (id: number) => void;
}

const BookingCard = ({ booking, onAccept }: BookingCardProps) => {
    const [showFull, setShowFull] = useState(false);
    const [showAcceptButton, setShowAcceptButton] = useState(true);
    const [location, setLocation] = useState<Location | null>(null);
    
    useEffect(() => {
        if (!navigator.geolocation) {
            alert('위치 정보가 지원되지 않는 브라우저입니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                setLocation({ latitude, longitude });
            },
            async (err) => {
                console.error('위치 탐지 실패:', err);
            }
        );
    }, []);

    const handleAcceptClick = async () => {
        if (location === null) {
            alert("현재 위치 정보를 알 수 없어 수거 예약 처리를 할 수 없습니다.");
        } else {
            try {
                const payload = {
                    latitude1: booking.latitude,
                    longitude1: booking.longitude,
                    latitude2: location.latitude,
                    longitude2: location.longitude,
                };
                await acceptBookingById(booking.id.toString(), payload);
                onAccept(booking.id);
                setShowAcceptButton(false);
                alert('예약 수락 요청이 완료 되었습니다.');
            } catch (e: any) {
                alert('예약 위치와 너무 멀어서 수거 예약 처리를 할 수 없습니다.');
                setShowAcceptButton(true);
            }
        }
    };
    
    return (
        <div className={styles.card}>
            <h3>주소: {booking.address}</h3>
            <p>신청자: {booking.bookerName}</p>
            {/* <p>신청일: {new Date(booking.createdAt).toLocaleDateString()}</p> */}
            <p>상태: {booking.status}</p>
            <p>
                {showFull
                    ? booking.content
                    : booking.content.length > 50
                    ? booking.content.slice(0, 50) + "..."
                    : booking.content}
                {booking.content.length > 50 && !showFull && (
                    <span
                        className={styles.moreText}
                        onClick={() => setShowFull(true)}
                    >
                        더보기
                    </span>
                )}
            </p>
            
            <div className={styles.actions}>
                {showAcceptButton && 
                    <button className={styles.editBtn} onClick={handleAcceptClick}>수락</button>
                }
            </div>
        </div>
    );
};

export default BookingCard;
