import React, { useEffect, useState } from 'react';
import { createReview, editReviewById, getReviewById } from '../api/reviewApi';
import { RatingStars } from '../components/RatingStars';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/pages/ReviewFormPage.module.css';

const ReviewEditFormPage: React.FC = () => {
    const { id } = useParams<{ id:string }>();
    const [productName, setProductName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReview = async () => {
            const res = await getReviewById(id!);
            setProductName(res.productName);
            setReview(res.review);
            setRating(res.rating);
        };

        fetchReview();
    }, [id]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await editReviewById(id!, { productName, review, rating });
        alert('리뷰가 수정되었습니다.');
        navigate(`/review/${id}`);
    };

    return (
        <div className={styles.pageWrapper}>
            <form onSubmit={handleSubmit} className={styles.formCard}>
                <h1 className={styles.title}>약 리뷰 수정</h1>

                <input
                    type="text"
                    placeholder="약 이름"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    required
                    className={styles.input}
                />

                <textarea
                    placeholder="리뷰를 작성해주세요"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    required
                    className={styles.textarea}
                />

                <div className={styles.rating}>
                    <span>별점&nbsp;&nbsp;</span>
                    <RatingStars rating={rating} onChange={setRating} />
                </div>

                <button type="submit" className={styles.submitButton}>
                    리뷰 등록
                </button>
            </form>
        </div>
    );
};

export default ReviewEditFormPage;
