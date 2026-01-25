'use client';

import { Product } from '@/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Grid, Column } from '@carbon/react';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <div className={styles.gridContainer}>
            <Grid fullWidth>
                {products.map((product) => (
                    // Carbon Grid: sm=4 (1 col), md=4 (2 cols), lg=4 (3 cols), xlg=3 (4-5 cols)
                    // We want 5 columns on wide screens (xlg/max)
                    // 16 columns total in Carbon grid (standard) or 1? Carbon grid is usually 16 cols.
                    // sm=4 (25%), md=4 (25% - wait md is 8 cols usually), lg=4 (25% of 16).
                    // Let's assume standard Carbon grid behavior.
                    <Column key={product.id} sm={4} md={4} lg={4} xlg={3} className={styles.column}>
                        <ProductCard product={product} />
                    </Column>
                ))}
            </Grid>
        </div>
    );
};
