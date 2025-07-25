import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { slidesData } from "../../utils/Data";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("default", { month: "short", year: "numeric" });

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSize();
  };

  return (
    <main>
      <div className="slider__container">
        <Swiper
          modules={[Pagination]}
          grabCursor
          centeredSlides={true}
          //slidesPerView="auto"
          spaceBetween={20}
          slideToClickedSlide
          speed={800}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            0: { slidesPerView: 0.7, spaceBetween: 20 },
            400: { slidesPerView: 0.9, spaceBetween: 20 },
            600: { slidesPerView: 1.1, spaceBetween: 30 },
            800: { slidesPerView: 1.4, spaceBetween: 40 },
            991: { slidesPerView: 1.5, spaceBetween: 50 },
          }}
          slidesSizesGrid={[70, 80, 90, 100, 110]}
        >
          {slidesData.map((slide, index) => {
            const width = activeIndex === index ? "90" : "70";
            return (
              <SwiperSlide
                key={index}

              >
                <img src={slide.imgSrc} alt={slide.title} />
                <div className="slider__title">
                  <h1>{slide.title}</h1>
                  <h2>{slide.company}</h2>
                  <div className="slider__meta-info">
                    <span>
                      <FaCalendarAlt style={{ marginRight: "7px" }} />
                      {formatDate(slide.date_from)} – {formatDate(slide.date_to)}
                    </span>
                    <span>
                      <FaLocationDot style={{ marginRight: "6px" }} />
                      {slide.location}
                    </span>
                  </div>
                </div>
                <div className="slider__content">
                  <div className="slider__text-box">
                    {/* ✅ NEW inner wrapper */}
                    <div className="slider__text-content">
                      <h1>{slide.company}</h1>
                      <h2>{slide.title}</h2>
                      <div className="slider__meta-info">
                        <span>
                          <FaCalendarAlt style={{ marginRight: "8px" }} />
                          {formatDate(slide.date_from)} – {formatDate(slide.date_to)}
                        </span>
                        <span>
                          <FaLocationDot style={{ marginRight: "8px" }} />
                          {slide.location}
                        </span>
                      </div>
                      <p>{slide.description}</p>
                    </div>
                  </div>
                  <div className="slider__footer">
                    <div className="slider__categories">
                      {slide.categories.map((category, idx) => (
                        <span key={idx} style={{ "--i": idx + 1 }}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </main>
  );
}
