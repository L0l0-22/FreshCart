
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import mainSlider from '../../assets/imgs/61cSNgtEISL._AC_SY200_.jpg';
import mainSlider2 from '../../assets/imgs/41nN4nvKaAL._AC_SY200_.jpg';
import slide1 from '../../assets/imgs/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg';
import slide2 from '../../assets/imgs/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg';
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <>
        <div className="flex lg:w-[50%] mx-auto py-8">
            <div className="w-1/2">
            <Slider {...settings}>
            <img src={mainSlider} className="w-full h-[400px]" alt="Main Slider"/>
            <img src={mainSlider2} className="w-full h-[400px]" alt="Main Slider"/>
            </Slider>
            </div>
            <div className="w-1/2 flex flex-col">
                <img src={slide1} className="w-full h-[200px]" alt="Slide 1"/>
                <img src={slide2} className="w-full h-[200px]" alt="Slide 2"/>
            </div>
        </div>
        </>
    )
}
