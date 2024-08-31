/* eslint-disable no-unused-vars */
import axios from 'axios'
import React , {useEffect, useState} from 'react'
import useCategories from '../../hooks/useCategories'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Categories() {
    let {isLoading , isFetching , isError , data} = useCategories();
    const [count, setCount] = useState(0)
    useEffect(()=>{},[])
    if(isLoading){
        return <LoadingScreen/>
    }
    return (
        <div className='container w-[90%] mx-auto'>
                    <h1 className='text-center text-green-700 text-4xl font-bold mb-10'>All Categories</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data ? data.data.data.map((Category) => (
            <div className='item' key={Category.id}>
                <div className='visible-on-hover border rounded-lg shadow hover:border-green-400 hover:shadow-green-400'>
                    <img className='h-[400px] w-full rounded' src={Category.image} alt={Category.name} />
                    <div className='text-center mt-5'>
                        <h1 className='text-2xl font-bold text-green-900'>{Category.name}</h1>
                    </div>
                </div>
            </div>
        )) : null}
    </div>
</div>
    )
}
