/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import Slider from 'react-slick'
import RatingStars from '../RatingStars/RatingStars'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { CartContext } from '../CartContext/CartContext';

export default function RelatedSlider({ products }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 6,
                },
            },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 4,
            },
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            },
        },
    ],
    };
    let { addProductToCard } = useContext(CartContext);
    const [loading , setloading] = useState(false)
    const [currentId , setCurrentId] = useState(0)
    function addToCart(id) {
        setCurrentId(id);
        setloading(true);
        addProductToCard(id)
            .then((response) => {
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            })
            .finally(() => {
                setloading(false);
            });
    }
    return (
        <>
        <h1 className='text-5xl text-center font-serif text-green-900'>Related Products</h1>
        <div className='container row'>
        <div className="lg:w-[85%] mx-auto w-full">
            <Slider {...settings}>
            {products.map((product) => (
                <div key={product.id} >
                    <div className='visible-on-hover p-2 hover:border hover:border-green-400 hover:rounded-lg hover:shadow hover:shadow-green-400'>
                        <div className='product'>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <div className="px-5 pb-5">
                                    <h2 className="text-xl font-semibold tracking-tight text-green-600 dark:text-white">{product.category.name}</h2>
                                    <h2 className="text-xl text-gray-900 dark:text-white">{product.slug.split(' ').slice(0, 2).join(' ')}</h2>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <RatingStars rating={product.ratingsAverage} />
                                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">{product.ratingsAverage}</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between btn w-[90%] mx-auto my-5">
                            <button onClick={() => addToCart(product.id)} className="w-[75%] text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                { loading && currentId == product.id ? (<i className='fas fa-spinner fa-spin'></i>):'Add to cart'}</button>
                            <i className="fa-solid fa-heart text-green-900 text-3xl"></i>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
            </Slider>
        </div>
        </div>
        </>
    )
}
