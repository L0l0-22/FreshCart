/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { WishListContext } from '../CartContext/WishListContext';

export default function WishList() {
    const context = useContext(WishListContext);
    const { getLoggedUserWishList, deleteWishListItem } = context;

    const [WishListDetails, setWishListDetails] = useState(null);

    async function getWishListItems(params) {
        let response = await getLoggedUserWishList(); 
        setWishListDetails(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        if (getLoggedUserWishList) {
            getWishListItems();
        }
    }, [getLoggedUserWishList]);

    const deleteItems = async (id) => {
        let response = await deleteWishListItem(id);
        if (response.data.status === 'success') {
            toast.success('Your Item Deleted Successfully');
            // Update the wishlist details state by filtering out the deleted item
            setWishListDetails(prevState => ({
                ...prevState,
                data: prevState.data.filter(item => item.id !== id)
            }));
        } else {
            toast.error('Error');
        }
    };

    const { isLoading } = useQuery({
        queryKey: ['WishList'],
        queryFn: getWishListItems,
        config: { staleTime: 7000 }
    });

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
            { WishListDetails && WishListDetails.count > 0 ?
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto ">
            <h1 className='text-center text-green-700 text-4xl font-bold mb-10'> Your WishList </h1>
                <div className='  w-[75%] mx-auto'>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm">Product</th>
                            <th scope="col" className="px-6 py-3 text-sm">Price</th>
                            <th scope="col" className="px-6 py-3 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {WishListDetails.data.map((product) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-xl dark:text-white">{product.slug}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
                                <td className="px-6 py-4">
                                    <span onClick={()=> deleteItems (product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div> 
            : <h1 className='text-center text-green-700 text-4xl font-bold mb-10'>Your Wishlist is empty</h1>};
        </>
    );
}