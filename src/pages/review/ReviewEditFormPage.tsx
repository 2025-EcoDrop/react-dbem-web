import React, { useEffect, useState } from 'react';
import { editReviewById, getReviewById } from '../../apis/reviewApi';
import { RatingStars } from '../../components/RatingStars';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles/pages/review/ReviewFormPage.module.css';
import { findProductName } from '../../apis/publicDataApi';

const ReviewEditFormPage = () => {
    const { id } = useParams<{ id:string }>();
    const [productName, setProductName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [publicData, setPublicData] = useState(false);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReview = async () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const res = await getReviewById(id!);
            setProductName(res.productName);
            setReview(res.review);
            setRating(res.rating);
            setPublicData(res.publicData);
        };

        fetchReview();
    }, [id]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await editReviewById(id!, { productName, review, rating, publicData });
        alert('리뷰가 수정되었습니다.');
        navigate(`/review/${id}`);
    };

    const handleProductNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProductName(value);

        if (value.length > 1) {
            try {
                const response = await findProductName(productName);
                setSuggestions(response);
                setShowSuggestions(true);
                setPublicData(false);
            } catch (error: any) {
                console.error(error.response);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <form onSubmit={handleSubmit} className={styles.formCard}>
                <h2 className={styles.title}>약 리뷰 수정</h2>

                <div>
                    <input
                        type="text"
                        placeholder="약 이름"
                        value={productName}
                        onChange={handleProductNameChange}
                        required
                        className={styles.input}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // 클릭 시 사라지지 않게 약간의 딜레이
                    />
                    
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className={styles.suggestionList}>
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setProductName(item);
                                        setSuggestions([]);
                                        setShowSuggestions(false);
                                        setPublicData(true);
                                    }}
                                    className={styles.suggestionItem}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

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
                    리뷰 수정
                </button>
            </form>
        </div>
    );
};

export default ReviewEditFormPage;
