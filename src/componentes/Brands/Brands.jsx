/* eslint-disable no-unused-vars */
import axios from 'axios'
import React , {useEffect, useState} from 'react'
import useBrands from '../../hooks/useBrands'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Brands() {
    let {isLoading , isFetching , isError , data} = useBrands();
    const [count, setCount] = useState(0)
    useEffect(()=>{},[])
    if(isLoading){
        return <LoadingScreen/>
    }
    return (
        <div className='container w-[90%] mx-auto'>
        <h1 className='text-center text-green-700 text-5xl font-bold mb-10'>All Brands</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data ? data.data.data.map((brands) => (
            <div className='item' key={brands.id}>
                <div className='visible-on-hover border rounded-lg shadow hover:border-green-400 hover:shadow-green-400'>
                    <img className='w-full rounded' src={brands.image} alt={brands.name} />
                </div>
            </div>
        )) : null}
    </div>
</div>
    )}