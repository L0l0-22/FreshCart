/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios, { Axios } from 'axios';
import { Formik, useFormik } from 'formik'
import React , {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {
    const [isLoading , setIsLoading] = useState(false);
    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3 , 'name min length is 3').max(10 , 'name max length is 10').required('name is required'),
        email: Yup.string().email('email is invalid').required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z]{5,10}$/ , 'password must start with uppercase and the min length is 5 and the max length is 10').required('password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword must match the Password').required('rePassword is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , 'phone must be egyption number').required('phone is required')
    })
    let navigate = useNavigate();
    const [apiError, setapiError] = useState('');
    function handleRegister(formValues)
    {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues )
        .then((apiResponse) =>{
            navigate('/');
            console.log(apiResponse);
            setIsLoading(false);
        })
        .catch((apiResponse)=>{
            setapiError(apiResponse?.response?.data?.message);
            setIsLoading(false);
            })
    }
    // function myValidation(formValues) {
    //     let errors = {};
    
    //     if (!formValues.name) {
    //         errors.name = 'Name is required';
    //     } else if (!/^[A-Za-z]{3,20}$/.test(formValues.name)) {
    //         errors.name = 'Name must be between 3 and 20 characters long and contain only letters.';
    //     }
    //     if (!formValues.email) {
    //         errors.email = 'Email is required';
    //     } else if (
    //         !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formValues.email)
    //     ) {
    //         errors.email = 'Enter a valid email address';
    //     }
    //     if (!formValues.password) {
    //         errors.password = 'password is required';
    //     } else if (
    //         !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formValues.password)
    //     ) {
    //         errors.password = 'Enter a valid password';
    //     }
    //     if (!formValues.phone) {
    //         errors.phone = 'phone is required';
    //     } else if (
    //         !/^01[0125][0-9]{8}$/.test(formValues.phone)
    //     ) {
    //         errors.phone = 'Enter a valid phone number';
    //     }
    //     return errors;
    // }
    let formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            email:'',
            password:'',
            rePassword:'',
        },
        validationSchema,
        onSubmit:handleRegister
    });
    return (
        <>
        {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
            </div>: null}
        <div className='py-6 max-w-xl  mx-auto'>
            <h1 className='text-green-700 font-bold text-3xl py-5'>REGISTER HERE</h1>
            <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            </div>
            {formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.name}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.rePassword}
            </div>: null}
            <div className="relative z-0 w-full mb-5 group">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel"  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
            </div>
            {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.phone}
            </div>: null}
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-600" disabled={isLoading} >Submit {isLoading && <i className='fas fa-spin fa-spinner'></i>}</button>
            <p className="text-md font-light text-black pt-4">Already have an account? 
                <Link to={'/login'} className="font-medium text-green-700 hover:underline hover:text-green-800">Login here</Link>
            </p>
            </form>
        </div>
        </>
    )
}
