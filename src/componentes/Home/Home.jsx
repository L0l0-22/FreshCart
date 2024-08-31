/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import RecentProducts from '../ReacentProducts/RecentProducts';
import CategorySlider from '../CatergorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import Search from '../Search/Search';
import useProducts from '../../hooks/useProducts';

export default function Home() {
    let { isLoading, isFetching, isError, data } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
            <MainSlider />
            <CategorySlider />
            <RecentProducts/>
        </>
    );
}
