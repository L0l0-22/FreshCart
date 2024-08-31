// eslint-disable-next-line no-unused-vars
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function useProducts() {
    function getRecentProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products' , )
    }
    let responseObject =useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        staleTime:8000,
    })
    return responseObject
}
