/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { data } from 'autoprefixer';
import axios, { Axios } from 'axios';
import { Formik, useFormik } from 'formik'
import React , {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/UserContext';
import { CartContext } from '../CartContext/CartContext';
import * as Yup from 'yup'

export default function checkOut() {
  const {cartId} = useContext(CartContext)
  let {CheckOutCart}= useContext(CartContext)
  let validationSchema = Yup.object().shape({
    details: Yup.string().required('details is required'),
    city: Yup.string().required('city is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , 'phone must be egyption number').required('phone is required')
})
  let formik = useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:''
    },
    validationSchema,
    onSubmit: ()=> handlecheckOut( cartId , 'http://localhost:5173' )
});
    async function handlecheckOut(cartId , url)
    { 
      let {data} = await CheckOutCart(cartId , url , formik.values);
      window.location.href = data.session.url
    }    
    return (
        <>
        <div className='py-6 max-w-xl mt-20 mx-auto'>
            <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details </label>
            </div>
            {formik.errors.details && formik.touched.details?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.details}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            </div>
            {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
            </div>
            {formik.errors.city && formik.touched.city?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.city}
            </div>: null}
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  disabled:bg-gray-600">Check Out</button>
            </form>
        </div>
        </>
    )
}