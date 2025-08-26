import { useState } from 'react';
import { acceptBookingById } from '../../apis/bookingApi';
import styles from '../../styles/components/BookingCard.module.css';
import { Booking } from '../../types/Booking';

interface BookingCardProps {
    booking: Booking;
    onAccept: (id: number) => void;
}

const BookingCard = ({ booking, onAccept }: BookingCardProps) => {
    const [showFull, setShowFull] = useState(false);
    const [showAcceptButton, setShowAcceptButton] = useState(true);

    const handleAcceptClick = async () => {
        try {
            await acceptBookingById(booking.id.toString());
            onAccept(booking.id);
            setShowAcceptButton(false);
            alert('예약 수락 요청이 완료 되었습니다.');
        } catch (e: any) {
            alert('예약 수락 실패');
            setShowAcceptButton(true);
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
