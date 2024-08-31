/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Context } from '../../Context/UserContext';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";

export default function AllOrders() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['recentOrders'],
        queryFn: getRecentOrders,
        config: { staleTime: 7000 }
    });

    let {UserToken } = useContext(Context)
    console.log(UserToken);
    const {id} = jwtDecode(UserToken);
    async function getRecentOrders() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching orders');
        }
    }
useEffect(()=>{
    getRecentOrders();
},[])
    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <p className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50'>Error fetching orders</p>;
    }

    return (
        <div className='container mx-auto w-[90%]'>
            <h1 className='text-center text-green-700 text-5xl font-bold mb-10'>All Orders</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {data && data.length > 0 ? (
                    data.map((order) => (
                        <div key={order._id} className='border p-4'>
                            <h2 className='text-lg font-bold text-green-700'>{order.id}</h2>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>User:</strong> {order.user.name}</p>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>Email:</strong> {order.user.email}</p>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>Total Price:</strong> ${order.totalOrderPrice}</p>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>Payment Method:</strong> {order.paymentMethodType}</p>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>Is Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
                            <p className='text-green-700 font-semibold'><strong className='text-gray-700'>Is Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders to display</p>
                )}
            </div>
        </div>
    );
}