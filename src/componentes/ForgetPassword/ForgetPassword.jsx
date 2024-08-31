import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
    });
    const handleForgetPassword = (formValues) => {
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues)
            .then((apiResponse) => {
                setIsLoading(false);
                toast.success(apiResponse.data.message)
                navigate('/verifyPassword');
            })
            .catch((error) => {
                setApiError(error.response?.data?.message || 'An error occurred');
                setIsLoading(false);
            });
    };
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: handleForgetPassword,
    });

    return (
        <>
            {apiError && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
                </div>
            )}
            <div className="py-6 max-w-xl mx-auto">
                <h1 className="text-green-700 font-bold text-xl py-5">Please Enter Your Email Here</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            type="email"
                            name="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder="Email address"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-600"
                        disabled={isLoading}>Submit{isLoading && <i className="fas fa-spin fa-spinner"></i>}
                    </button>
                </form>
            </div>
        </>
    );
}