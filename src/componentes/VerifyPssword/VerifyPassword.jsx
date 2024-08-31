import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function VerifyPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        resetCode: Yup.string().required('code is required').matches(/^[0-9]{5,6}$/)
    });
    const handleVerifyPassword = (formValues) => {
        setIsLoading(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formValues)
            .then((apiResponse) => {
                console.log(apiResponse);
                console.log(apiResponse.config.data);
                setIsLoading(false);
                if (apiResponse.data.status == 'Success') {
                    navigate('/resetPassword');
                } else {
                    setApiError('Invalid verification code. Please try again.');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    setApiError(error.response.data.message || 'An error occurred');
                } else {
                    console.log(error.message);
                    setApiError('An error occurred');
                }
                setIsLoading(false);
            });
    };
    const formik = useFormik({
        initialValues: {
            resetCode:'',
        },
        validationSchema,
        onSubmit: handleVerifyPassword,
    });

    return (
        <>
            {apiError && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apiError}
                </div>
            )}
            <div className="py-6 max-w-xl mx-auto">
                <h1 className="text-green-700 font-bold text-xl py-5">Please Enter Your Validation Code Here</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.resetCode}
                            type="resetCode"
                            name="resetCode"
                            id="resetCode"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder="resetCode"
                        />
                        {formik.errors.resetCode && formik.touched.resetCode && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.resetCode}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-600"
                        disabled={isLoading}>Verify{isLoading && <i className="fas fa-spin fa-spinner"></i>}
                    </button>
                </form>
            </div>
        </>
    );
}