
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 4,
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
    const [categories , setCategories]= useState([])
    function getCategories(){
        axios.get('https://ecommerce.routemisr.com/api/v1/categories' , )
        .then((response) => {
            setCategories(response.data.data);
            
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }
    useEffect(()=>{
        getCategories();
    }, [])
    return (
        <>
        <div className='lg:w-[90%] mx-auto py-5'>
        <Slider {...settings}>
            {categories.map((category)=>
            <>
                <img className='h-[200px] w-full' src={category.image} alt={category.name} />
                <h2 className='mt-3 font-light text-l text-gray-900'>{category.name}</h2>
            </>
            )}
        </Slider>
        </div>
        </>
    )
}
