import { deleteBookingById } from '../../apis/bookingApi';
import styles from '../../styles/components/BookingCard.module.css';
import { Booking } from '../../types/Booking';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import { useState } from 'react';

interface BookingCardProps {
    booking: Booking;
    onDelete: (id: number) => void;
}

const MyBookingCard = ({ booking, onDelete }: BookingCardProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();


    const handleEditClick = () => {
        navigate(`/booking/form/${booking.id}`);
    };

    const handleDeleteClick = async () => {
        try {
            await deleteBookingById(booking.id.toString());
            onDelete(booking.id);
        } catch (e: any) {
            alert('예약 삭제 실패');
        } finally {
            setShowDeleteModal(false);
        }
    };
    
    return (
        <div className={styles.card}>
            <h3>{booking.content.length > 20 ? booking.content.slice(0, 20) + '...' : booking.content}</h3>
            <p>주소: {booking.address}</p>
            <p>신청일: {new Date(booking.createdAt).toLocaleDateString()}</p>
            {booking.collectorName &&
                <p>수락자: {booking.collectorName}</p>
            }
            <p>상태: {booking.status}</p>
            

            {booking.status !== 'COMPLETED' && 
                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={handleEditClick}>수정</button>
                    <button className={styles.deleteBtn} onClick={() => setShowDeleteModal(true)}>삭제</button>
                </div>
            }

            {booking.status === 'COMPLETED' && 
                <div className={styles.actions}>
                    <button className={styles.deleteBtn} onClick={() => setShowDeleteModal(true)}>삭제</button>
                </div>
            }

            {showDeleteModal && (
                <DeleteConfirmModal
                    message='정말 수거 예약을 삭제하시겠습니까?'
                    onConfirm={handleDeleteClick}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default MyBookingCard;
