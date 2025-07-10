import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteReviewById, getReviewById } from '../api/reviewApi';
import { Review } from '../types/Review';
import { RatingStars } from '../components/RatingStars';
import styles from '../styles/pages/ReviewDetailPage.module.css';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const ReviewDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [review, setReview] = useState<Review | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getReviewById(id).then(setReview);
        }
    }, [id]);

    if (!review) {
        return <div className={styles.loading}>리뷰를 불러오는 중...</div>;
    }

    const handleEditButton = () => {
        navigate(`/review/form/${review.id}/`);
    }

    const handleDeleteConfirm = async() => {
        try {
            await deleteReviewById(review.id);
            alert("삭제되었습니다.");
            navigate("/review");
        } catch (err) {
            console.error(err);
            alert("삭제에 실패했습니다.");
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <p className={styles.date}>
                        {new Date(review.createdAt).toLocaleDateString('ko-KR') === new Date(review.updatedAt).toLocaleDateString('ko-KR')
                            ? `작성일: ${new Date(review.createdAt).toLocaleDateString('ko-KR')}`
                            : `수정일: ${new Date(review.updatedAt).toLocaleDateString('ko-KR')}`}
                    </p>
                    <div className={styles.titleBox}>
                        <h2 className={styles.title}>{review.productName}</h2>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={handleEditButton} className={styles.editButton}>수정</button>
                        <button onClick={() => setShowDeleteModal(true)} className={styles.deleteButton}>삭제</button>
                    </div>
                    <div className={styles.ratingBox}>
                        별점&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className={styles.rating}>
                            <RatingStars rating={review.rating} onChange={() => (false)} />
                        </div>
                    </div>
                    <div className={styles.contentBox}>
                        <p className={styles.content}>{review.review}</p>
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                    ← 돌아가기
                    </button>
                </div>
            </div>
            {showDeleteModal && (
                <DeleteConfirmModal 
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};

export default ReviewDetailPage;
