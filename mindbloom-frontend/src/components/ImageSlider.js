import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Cursor from "../components/cursor";

const images = [
  "/assets/freepik__retouch__23685.png",
  "/assets/freepik__retouch__2530.png",
  "/assets/2211.q702.033.S.m005.c12.mental health.jpg",
  "/assets/emoji-faces-social-media.jpg",
  "/assets/face-expression-emotional-people-concept.jpg",
];

const ImageSlider = () => {
  return (
    <section className="relative py-6 sm:py-10 px-4" style={{ backgroundColor: "rgb(14, 15, 16)" }}>
      <Cursor />

      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full max-w-[95vw] sm:max-w-3xl md:max-w-5xl mx-auto"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 sm:h-[400px] md:h-[600px] object-cover rounded-lg shadow-lg transition-transform duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Background Effects */}
      <div className="absolute top-6 left-6 w-20 h-20 sm:w-32 sm:h-32 bg-secondary/30 rounded-full blur-3xl animate-pulse z-[-1]"></div>
      <div className="absolute top-40 right-6 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-secondary/50 rounded-full blur-2xl animate-spin-slow z-[-1]"></div>
    </section>
  );
};

export default ImageSlider;
