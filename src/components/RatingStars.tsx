import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import React, { FC, JSX } from 'react';
import styles from '../styles/components/RatingStars.module.css';

interface Props {
    rating: number;
    onChange: (value: number) => void;
}

export const RatingStars: React.FC<Props> = ({ rating, onChange }) => {
    const handleClick = (event: React.MouseEvent, index: number) => {
        const { left, width } = (event.target as HTMLElement).getBoundingClientRect();
        const clickX = event.clientX - left;
        const clickedHalf = clickX < width / 2 ? 0.5 : 1;
        const newRating = index + clickedHalf;
        onChange(newRating);
    };

    const getStarIcon = (index: number): JSX.Element => {
        let Icon = FaRegStar as FC<{ color: string }>;

        if (rating >= index + 1) Icon = FaStar as FC<{ color: string }>;
        else if (rating >= index + 0.5) Icon = FaStarHalfAlt as FC<{ color: string }>;

        return <Icon color="#f5b301" />;
    };

    return (
        <div className={styles.starContainer}>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className={styles.star}
                    onClick={(e) => handleClick(e, i)}
                >
                    {getStarIcon(i)}
                </span>
            ))}
        </div>
    );
};
