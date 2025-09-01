import { useEffect, useState } from 'react';
import { getReviews } from '../../apis/reviewApi';
import { Review } from '../../types/Review';
import styles from '../../styles/pages/review/ReviewsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { RatingStars } from '../../components/RatingStars';

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const filteredReviews = reviews.filter(review =>
        review.productName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const currentReviews = filteredReviews.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await getReviews(search, page-1);
            setReviews(data);
        };
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}>약 리뷰</h2>

                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="약 이름으로 검색"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className={styles.searchInput}
                    />
                    <button
                        className={styles.addButton}
                        onClick={() => navigate('/review/form')}
                    >
                        +
                    </button>
                </div>

                {filteredReviews.length === 0 ? (
                    <p className={styles.empty}>작성한 리뷰가 없습니다.</p>
                ) : (
                    <>
                        {currentReviews.map(review => (
                            <div
                                key={review.id}
                                className={styles.reviewCard}
                                onClick={() => navigate(`/review/${review.id}`)}
                            >
                                <h3 className={styles.medicineName}>{review.productName}</h3>
                                <div className={styles.rating}>
                                    <div className={styles.rating}>
                                        <RatingStars rating={review.rating} onChange={() => (false)} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className={styles.pagination}>
                            <button
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                                className={styles.pageButton}
                            >
                                &laquo;
                            </button>
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className={styles.pageButton}
                            >
                                &lsaquo;
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                key={i}
                                className={`${styles.pageButton} ${page === i + 1 ? styles.active : ''}`}
                                onClick={() => setPage(i + 1)}
                                >
                                {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className={styles.pageButton}
                            >
                                &rsaquo;
                            </button>
                            <button
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages}
                                className={styles.pageButton}
                            >
                                &raquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;
