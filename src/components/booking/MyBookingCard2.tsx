import styles from '../../styles/components/BookingCard.module.css';
import { Booking } from '../../types/Booking';
import { completeBookingById } from '../../apis/bookingApi';
import React, { useEffect, useState } from 'react';
import CompleteConfirmModal from '../modal/CompleteConfirmModal';
import { Location } from '../../types/BookingForm';

interface BookingCardProps {
    booking: Booking;
    onDelete: (id: number) => void;
    onActiveTab: () => void;
}

const MyBookingCard2: React.FC<BookingCardProps> = ({ booking, onDelete, onActiveTab }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleCompleteClick = async () => {
        if (location === null) {
            alert("현재 위치 정보를 알 수 없어 수거 완료 처리를 할 수 없습니다.");
            setShowDeleteModal(false);
        } else {
            try {
                const payload = {
                    latitude1: booking.latitude,
                    longitude1: booking.longitude,
                    latitude2: location.latitude,
                    longitude2: location.longitude,
                };
                await completeBookingById(booking.id.toString(), payload);
                onDelete(booking.id);
                onActiveTab();
            } catch (e: any) {
                alert('예약 위치에서 멀어서 수거 완료 처리를 할 수 없습니다.');
                setShowDeleteModal(false);
            } finally {
                setShowDeleteModal(false);
            }
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