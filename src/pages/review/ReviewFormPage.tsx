import React, { useState } from 'react';
import { createReview } from '../../apis/reviewApi';
import { RatingStars } from '../../components/RatingStars';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/review/ReviewFormPage.module.css';
import { findProductName } from '../../apis/publicDataApi';

const ReviewFormPage: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [publicData, setPublicData] = useState(false);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createReview({ productName, review, rating, publicData });
        alert('리뷰가 등록되었습니다.');
        navigate('/review');
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
                <h2 className={styles.title}>약 리뷰 작성</h2>

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
                    onFocus={() => setShowSuggestions(false)}
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

export default ReviewFormPage;
