import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle'
import {Autoplay} from "swiper/modules"
function BannerSlider() {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            className='sliderbanner'
             centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}


        >
            <SwiperSlide className='p-[5px]'>
                <img className='rounded-[10px] aspect-w-16 aspect-h-9' src='./banner.png'></img>
            </SwiperSlide>
            <SwiperSlide className='p-[5px]' >
                <img className='rounded-[10px] aspect-w-16 aspect-h-9' src='./banner2.png'></img>
            </SwiperSlide>
            <SwiperSlide className='p-[5px]'>
                <img src='./banner3.png' className='rounded-[10px] aspect-w-16 aspect-h-9'></img>
            </SwiperSlide>

        </Swiper>

    )
}
export default BannerSlider