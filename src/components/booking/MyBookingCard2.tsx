import styles from '../../styles/components/BookingCard.module.css';
import { Booking } from '../../types/Booking';
import { completeBookingById } from '../../apis/bookingApi';
import { useState } from 'react';
import CompleteConfirmModal from '../modal/CompleteConfirmModal';

interface BookingCardProps {
    booking: Booking;
    onDelete: (id: number) => void;
    onActiveTab: () => void;
}

const MyBookingCard2 = ({ booking, onDelete, onActiveTab }: BookingCardProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleCompleteClick = async () => {
        try {
            await completeBookingById(booking.id.toString());
            onDelete(booking.id);
            onActiveTab();
        } catch (e: any) {
            alert('예약 완료 실패');
        }  finally {
            setShowDeleteModal(false);
        }
    };
    
    return (
        <div className={styles.card}>
            <h3>{booking.content.length > 20 ? booking.content.slice(0, 20) + '...' : booking.content}</h3>
            <p>주소: {booking.address}</p>
            <p>신청일: {new Date(booking.createdAt).toLocaleDateString()}</p>
            <p>신청자: {booking.bookerName}</p>
            <p>상태: {booking.status}</p>

            {booking.status === 'IN_PROGRESS' &&
                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => setShowDeleteModal(true)}>완료</button>
                </div>
            }

            {showDeleteModal && (
                <CompleteConfirmModal
                    message='정말 수거 완료 처리하시겠습니까?'
                    onConfirm={handleCompleteClick}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default MyBookingCard2;