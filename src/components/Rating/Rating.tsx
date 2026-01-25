import styles from './Rating.module.css';
import { Star, StarFilled, StarHalf } from '@carbon/icons-react';

interface RatingProps {
    rating: number; // 0-5
}

export const Rating = ({ rating }: RatingProps) => {
    // Round to nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (roundedRating >= i) {
            stars.push(<StarFilled key={i} className={styles.starFilled} />);
        } else if (roundedRating >= i - 0.5) {
            stars.push(<StarHalf key={i} className={styles.starFilled} />);
        } else {
            stars.push(<Star key={i} className={styles.starEmpty} />);
        }
    }

    return <div className={styles.rating}>{stars}</div>;
};
