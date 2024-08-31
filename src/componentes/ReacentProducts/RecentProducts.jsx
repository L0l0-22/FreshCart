/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import RatingStars from '../RatingStars/RatingStars';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import Search from '../Search/Search';
import { WishListContext } from '../CartContext/WishListContext';

export default function RecentProducts() {
    let {isLoading , isFetching , isError , data} = useProducts();
    let {addProductToCard , setCartNum , cartNum} = useContext(CartContext)
    let {addProductToWishList } = useContext(WishListContext)
    const [loading , setloading] = useState(false)
    const [currentId , setCurrentId] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');
    const [wishList, setWishList] = useState(null);
    function addToCart(id) {
        setCurrentId(id);
        setloading(true);
        addProductToCard(id)
            .then((response) => {
                if (response.data.status === 'success') {
                    setCartNum(cartNum + 1);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            })
            .finally(() => {
                setloading(false);
            });
    }
    function addToWishList(id) {
        setCurrentId(id);
        addProductToWishList(id)
            .then((response) => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                    setWishList(id); // Set the product as in the wishlist
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error adding product to wishlist:', error);
            });
    }
    if(isLoading){
        return <LoadingScreen/>
    }
    const filteredData = data ? data.data.data.filter(product => {
        const words = product.title.toLowerCase().split(' ');
        return words.some(word => word.includes(searchQuery.toLowerCase()));
    }) : [];
    return (
        <>
            <Search onSearch={setSearchQuery} />
            <div className='row lg:w-[90%] mx-auto'>
                {filteredData.map((product) => (
                    <div key={product.id} className='visible-on-hover lg:w-1/4 p-2 sm:w-full md:w-1/3 hover:border hover:border-green-400 hover:rounded-lg hover:shadow hover:shadow-green-400'>
                        <div className='product'>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <div className="px-5 pb-5">
                                    <h2 className="text-xl font-semibold tracking-tight text-green-600 dark:text-white">{product.category.name}</h2>
                                    <h2 className="text-xl text-gray-900 dark:text-white">{product.slug.split(' ').slice(0, 2).join(' ')}</h2>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <RatingStars rating={product.ratingsAverage} />
                                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">{product.ratingsAverage}</span>
                                    </div>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between btn w-[90%] mx-auto my-5">
                            <button onClick={() => addToCart(product.id)} className="w-[75%] text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                { loading && currentId == product.id ? (<i className='fas fa-spinner fa-spin'></i>):'Add to cart'}</button>
                                <button onClick={() => addToWishList(product.id)}>
    {wishList === product.id ? (
        <i className="fa-solid fa-heart text-red-900 text-3xl"></i>
    ) : (
        <i className="fa-solid fa-heart text-gray-600 text-3xl"></i>
    )}
</button>
        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    )
}
