'use client';

import { MenuButton, MenuItem } from '@carbon/react';
import styles from './BuyButton.module.css';
import { ShoppingCart } from '@carbon/icons-react';

export const BuyButton = () => {
    return (
        <div className={styles.container}>
            <MenuButton label="Koupit" kind="primary" size="sm">
                <MenuItem label="Koupit zrychleně" />
                <MenuItem label="Porovnat" />
                <MenuItem label="Hlídat" />
                <MenuItem label="Přidat do seznamu" />
            </MenuButton>
        </div>
    );
};
