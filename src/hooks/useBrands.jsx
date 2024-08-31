// eslint-disable-next-line no-unused-vars
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function useBrands() {
    function getRecentBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands' , )
    }
    let responseObject =useQuery({
        queryKey: ['recentBrands'],
        queryFn: getRecentBrands,
        staleTime:8000,
    })
    return responseObject
}
