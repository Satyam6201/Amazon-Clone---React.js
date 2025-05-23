import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/HomeBannerSlider.css'
import { Navigation } from 'swiper/modules';
import slide1 from '../assets/homeBannerSlides/4.jpg'
import slide2 from '../assets/homeBannerSlides/5.jpg'
import slide3 from '../assets/homeBannerSlides/6.jpg'
import slide7 from '../assets/homeBannerSlides/7.jpg';
import slide8 from '../assets/homeBannerSlides/8.jpg';
import slide9 from '../assets/homeBannerSlides/9.jpg';

const HomeBannerSliderSmall = () => {
  return (
    <>
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

        <SwiperSlide>
            <img src={slide1}/>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide2}/>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide3}/>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide7}/>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide8}/>
        </SwiperSlide>

        <SwiperSlide>
            <img src={slide9}/>
        </SwiperSlide> 
               
      </Swiper>
    </>
  )
}

export default HomeBannerSliderSmall