/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import RatingStars from '../RatingStars/RatingStars';
import Slider from "react-slick";
import RelatedSlider from '../RelatedSlider/RelatedSlider';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let {id , category} = useParams();
    const [relatedDetails, setRelatedDetails] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [isLoading, setisLoading] = useState(true)
    
    let {addProductToCard} = useContext(CartContext)
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
    function getProductDetails(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`,)
        .then((response) => {
            setProductDetails(response.data.data);
            setisLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    function getRelatedProducts(category){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`,)
        .then((response) => {
            let allProducts = response.data.data;
            let relatedProducts = allProducts.filter((product) => product.category.name === category);
            setRelatedDetails(relatedProducts);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    useEffect (() =>{
        getProductDetails(id);
        getRelatedProducts(category);
    },[id , category]); // component dead update (when id or category change rerunder again)
    return (
        <>
        {isLoading ? <LoadingScreen/> :<> 
            <div className='mx-auto container row'>
                <div className="lg:w-1/4 w-full">
                <Slider {...settings}>
                {productDetails.images.map((src , index) => <> 
                <img key={index} className='w-full' src={src} alt={productDetails.title}></img> </>)}
                </Slider>
                </div>
                <div className="lg:w-3/4 w-full mt-4 " key={productDetails.id}>
                    <div className='w-[75%] mx-auto my-2'>
                        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 ">{productDetails.slug}</h2>
                        <h2 className="text-xl py-2 text-gray-900">{productDetails.description}</h2>
                    </div>
                    <div className="flex items-center justify-between w-[75%] mx-auto my-2">
                    <span className="text-3xl font-bold text-gray-900 ">${productDetails.price}</span>
                    <div className="flex items-center mt-2.5 mb-5 ">
                        <RatingStars rating={productDetails.ratingsAverage}/>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ms-3">{productDetails.ratingsAverage}</span>
                    </div>
                    
                    </div>
                    
                    <div className="flex items-center justify-between w-[65%] mx-auto my-2">
                    <button onClick={()=> addToCart(productDetails.id)} className="text-white bg-green-600 my-5 w-[85%] font-medium rounded-lg text-sm px-5 py-2.5 text-center btn">{ loading && currentId == productDetails.id ? (<i className='fas fa-spinner fa-spin'></i>):'Add to cart'}</button>
                    <i className="fa-solid fa-heart text-green-900 text-3xl"></i>
                    </div>
                </div>
            </div>
            <RelatedSlider products={relatedDetails} />
            </>
            }
        </>
    )
}
