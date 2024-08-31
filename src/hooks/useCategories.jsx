// eslint-disable-next-line no-unused-vars
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function useCategories() {
    function getCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories' , )
    }
    let responseObject =useQuery({
        queryKey: ['Categories'],
        queryFn: getCategories,
        staleTime:8000,
    })
    return responseObject
}