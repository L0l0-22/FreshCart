/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { data } from 'autoprefixer';
import axios, { Axios } from 'axios';
import { Formik, useFormik } from 'formik'
import React , {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Context } from '../../Context/UserContext';

export default function ResetPassword() {
    let {setUserToken} = useContext(Context)
    const [isLoading , setIsLoading] = useState(false);
    let validationSchema = Yup.object().shape({
        email: Yup.string().email('email is invalid').required('email is required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z]{5,10}$/ , 'password must start with uppercase and the min length is 5 and the max length is 10').required('newPassword is required')
    })
    let navigate = useNavigate();
    const [apiError, setapiError] = useState('');
    async function handleResetPassword(formValues)
    {
        setIsLoading(true);
        await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , formValues )
        .then((apiResponse) => {
            setIsLoading(false);
            if (apiResponse.data.token) {
                navigate('/');
            } else {
                setapiError('Invalid verification code. Please try again.');
            }
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                setapiError(error.response.data.message || 'An error occurred');
            } else {
                console.log(error.message);
                setapiError('An error occurred');
            }
            setIsLoading(false);
        });
    }
    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword: '',
        },
        validationSchema,
        onSubmit:handleResetPassword
    });
    return (
        <>
        {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
            </div>: null}
        <div className='py-6 max-w-xl  mx-auto'>
        <h1 className='text-green-700 font-bold text-3xl py-5'>Reset Password HERE</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New password</label>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.newPassword}
            </div>: null}
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-600" disabled={isLoading} >Reset newPassword{isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
            </form>
        </div>
        </>
    )
}
