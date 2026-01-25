'use client';

import { Tabs, Tab, TabList } from '@carbon/react';
import styles from './SortingTabs.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export const SortingTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    const selectedIndex = sortParam ? parseInt(sortParam) : 0;

    const handleChange = (index: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', index.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            <Tabs
                selectedIndex={selectedIndex}
                onChange={(evt) => handleChange(evt.selectedIndex)}
            >
                <TabList aria-label="Sort products">
                    <Tab>TOP</Tab>
                    <Tab>Nejprodávanější</Tab>
                    <Tab>Od nejlevnějšího</Tab>
                    <Tab>Od nejdražšího</Tab>
                </TabList>
            </Tabs>
        </div>
    );
};
