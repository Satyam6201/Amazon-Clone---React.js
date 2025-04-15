import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import '../styles/HomeBannerSlider.css';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

import slide1 from '../assets/homeBannerSlides/1.jpg';
import slide2 from '../assets/homeBannerSlides/2.jpg';
import slide3 from '../assets/homeBannerSlides/3.jpg';
import slide7 from '../assets/homeBannerSlides/7.jpg';
import slide8 from '../assets/homeBannerSlides/8.jpg';
import slide9 from '../assets/homeBannerSlides/9.jpg';

const HomeBannerSlider = () => {
  return (
    <div className="home-banner-container">
      <Swiper
        navigation={true}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slide1} alt="Slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="Slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="Slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide7} alt="Slide 7" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide8} alt="Slide 8" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide9} alt="Slide 9" />
        </SwiperSlide>
      </Swiper>
      <div className="banner-gradient"></div>
    </div>
  );
};

export default HomeBannerSlider;
