'use client';

import { Tag } from '@carbon/react';
import { Product } from '@/types/product';
import { Rating } from '../Rating/Rating';
import { BuyButton } from '../BuyButton/BuyButton';
import { formatPrice } from '@/utils/formatters';
import { decodeHtml } from '@/utils/htmlParser';
import styles from './ProductCard.module.css';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const stockColor = product.avail_color ? `#${product.avail_color}` : 'var(--color-text-light)';

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.img}
                    alt={product.name}
                    width={200}
                    height={200}
                    className={styles.image}
                    unoptimized // External images from Alza
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title} title={product.name}>
                    {product.name}
                </h3>

                <div className={styles.rating}>
                    <Rating rating={product.rating} />
                </div>

                <p className={styles.spec} dangerouslySetInnerHTML={{ __html: product.spec }} />

                {/* Example of optional promo badge */}
                {product.promo_cnt > 0 && (
                    <Tag type="green" className={styles.badge}>
                        + ZDARMA
                    </Tag>
                )}

                <div className={styles.priceContainer}>
                    <span className={styles.currentPrice} dangerouslySetInnerHTML={{ __html: formatPrice(product.price) }} />
                    {product.cprice && (
                        <span className={styles.originalPrice}>
                            {decodeHtml(product.cprice)}
                        </span>
                    )}
                </div>

                <div className={styles.actions}>
                    <div className={styles.buyButton}>
                        <BuyButton />
                    </div>
                </div>

                <div className={styles.stock} style={{ color: stockColor }}>
                    <span dangerouslySetInnerHTML={{ __html: decodeHtml(product.avail) }} />
                </div>
            </div>
        </article>
    );
};
