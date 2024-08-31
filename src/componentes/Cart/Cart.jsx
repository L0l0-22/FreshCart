/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';

export default function Cart() {
    let { getLoggedUserCart, updateCart, deleteCartItem, deleteAllCart , setCartNum , cartNum } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);

    const getCartItems = async () => {
        let response = await getLoggedUserCart();
        setCartDetails(response);
        return response;
    };

    useEffect(() => {
        getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getLoggedUserCart]);

    const updateCartItems = async (id, count) => {
        let response = await updateCart(id, count);
        if (response.data.status === 'success') {
            toast.success('Your Item Updated Successfully');
            setCartDetails(response);
        } else {
            toast.error('Error');
        }
    };

    const deleteItems = async (id) => {
        let response = await deleteCartItem(id);
        if (response.data.status === 'success') {
            setCartNum(cartNum - 1)
            toast.success('Your Item Deleted Successfully');
            setCartDetails(response);
        } else {
            toast.error('Error');
        }
    };

    const deleteCart = async () => {
        let response = await deleteAllCart();
        if (response.data.message === 'success') {
            toast.success('Your Cart Deleted Successfully');
            setCartDetails(response);
        } else {
            toast.error('Error');
        }
    };

    const { isLoading } = useQuery({
        queryKey: ['Cart'],
        queryFn: getCartItems,
        config: { staleTime: 7000 }
    });

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
            {cartDetails && cartDetails.data && cartDetails.data.data && cartDetails.data.data.products && cartDetails.data.data.products.length > 0 ?
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto ">
            <h1 className='text-center text-green-700 text-4xl font-bold mb-10'>Cart Shop</h1>
                <div className='flex justify-between w-[75%] mx-auto'>
                <h2 className='text-black text-center text-2xl font-bold capitalize my-4'>Total Cart Price: <span className='text-green-500'>{cartDetails && cartDetails.data && cartDetails.data.data ? cartDetails.data.data.totalCartPrice : 'Loading...'}</span></h2>
                <h2 className='text-black text-center text-2xl font-bold capitalize my-4'> Total Number of Items: <span className='text-green-500'>{cartDetails && cartDetails.data && cartDetails.data ? cartDetails.data.numOfCartItems : 'Loading...'} </span></h2>
                </div>
                <button onClick={deleteCart} type="button" className="absolute right-5 focus:outline-none text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Clear Cart</button>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">Product</th>
                            <th scope="col" className="px-6 py-3 text-sm">Qty</th>
                            <th scope="col" className="px-6 py-3 text-sm">Price</th>
                            <th scope="col" className="px-6 py-3 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartDetails && cartDetails.data.data.products.map((product) => (
                            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-xl dark:text-white">{product.product.title}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                    <button onClick={()=> updateCartItems (product.product.id , product.count - 1 )} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                    </svg>
                                    </button>
                                    <div>
                                        <span className='text-black font-bold'>{product.count}</span>
                                    </div>
                                    <button onClick={()=> updateCartItems (product.product.id , product.count + 1 )}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                    </svg>
                                    </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price * product.count}</td>
                                <td className="px-6 py-4">
                                    <span onClick={()=> deleteItems (product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                </td>
                            </tr>
                        ))} 
                        <tr>
                        <td colSpan="5" className="text-center">
                        <div className='flex flex-col items-center'>
                        <Link to={'/checkOut'}>
                            <button type="button" className="mt-4 focus:outline-none text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 ">Check Out</button>
                        </Link>
                        </div>
                        
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div> :
            <h1 className='text-center text-green-700 text-4xl font-bold mb-10'>Your Cart is empty</h1>}
            
        </>
    );
}