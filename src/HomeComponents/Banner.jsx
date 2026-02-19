import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "motion/react"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveRightIcon } from 'lucide-react';
import { Link } from 'react-router';

const Banner = () => {
    const bannerSlides = [
    {
      image: 'https://images.unsplash.com/photo-1643050079091-1d4a51e07ba0?w=1000',
      title: 'Discover Your Next Great Read',
      description: 'Browse thousands of books from local libraries and get them delivered to your door',
    },
    {
      image: 'https://images.unsplash.com/photo-1646385987161-5fc32bc7a539?w=1000',
      title: 'Reading Made Convenient',
      description: 'Enjoy your favorite books without leaving the comfort of your home',
    },
    {
      image: 'https://images.unsplash.com/photo-1703236079592-4d2f222e8d2f?w=1000',
      title: 'Support Your Local Libraries',
      description: 'Connect with community libraries and explore their vast collections',
    },
  ];
    return (
         <Swiper
      className='w-full h-75 lg:min-h-screen'
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }} 
    >

      {
        bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
       
        <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
        className='relative'>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-white text-center p-4'>
            <h1 className='md:text-6xl font-extrabold'>{slide.title}</h1>
            <p className='mt-4 md:text-2xl font-medium'>{slide.description}</p>

            <Link to={'/Books'}>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                <span> Browse Books</span>
                 <MoveRightIcon className="ml-2 w-5 h-5" />
            </button>
            </Link>

        </motion.div>
        
      </SwiperSlide>
        ))
      }
     

     

      
    </Swiper>
    );
};

export default Banner;