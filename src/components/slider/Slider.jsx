import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "./Slider.css"
import { func } from "prop-types";
import { slidesData } from "../../utils/Data"; // Assuming you have a slidesData.js file with the slide data
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


export default function Slider() {
    const swiperWrapperRef = useRef(null);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleString('default', { month: 'short', year: 'numeric' });

    function adjustMargin() {
        const screenWidth = window.innerWidth;

        if (swiperWrapperRef.current) {
            swiperWrapperRef.current.style.marginLeft =
            screenWidth <= 520
            ? "0px"
            : screenWidth <= 650
            ? "-50px"
            : screenWidth <= 800
            ? "-100px"
            : "-150px";
        }
    }

    useEffect(() => {
        adjustMargin();
        window.addEventListener("resize", adjustMargin);
        return () => {
            window.removeEventListener("resize", adjustMargin);
        };
    }, []);

    return (
        <main>
            <div className="slider__container">
                <Swiper
                  // install Swiper modules
                    modules={[Pagination]}
                    grabCursor
                    initialSlide={0}
                    centeredSlides={true}
                    slidesPerView="auto"
                    speed={800}
                    slideToClickedSlide
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {spaceBetween: 40},
                        650: {spaceBetween: 30},
                        1000: {spaceBetween: 20},
                    }}
                    onSwiper={(swiper) => {
                        swiperWrapperRef.current = swiper.wrapperEl;
                    }}
                >
                    {slidesData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <img src={slide.imgSrc} alt={slide.title} />
                            <div className="slider__title">
                                <h1>{slide.title}</h1>
                                <h2>{slide.company}</h2>
                                <div className="slider__meta-info">
                                    <span>
                                        <FaCalendarAlt style={{ marginRight: '7px' }} />
                                        {formatDate(slide.date_from)} – {formatDate(slide.date_to)}
                                    </span>
                                    <span>
                                        <FaLocationDot style={{ marginRight: '6px' }} />
                                        {slide.location}
                                    </span>
                                </div>
                            </div>
                            <div className="slider__content">
                                <div className="slider__text-box">
                                    <h1>{slide.company}</h1>
                                    <h2>{slide.title}</h2>
                                    <div className="slider__meta-info">
                                        <span>
                                            <FaCalendarAlt style={{ marginRight: '7px' }} />
                                            {formatDate(slide.date_from)} – {formatDate(slide.date_to)}
                                        </span>
                                        <span>
                                            <FaLocationDot style={{ marginRight: '6px' }} />
                                            {slide.location}
                                        </span>
                                    </div>
                                    <p>{slide.description}</p>
                                </div>
                                <div className="slider__footer">
                                    <div className="slider__categories">
                                        {slide.categories.map((category, idx) => (
                                            <span key={idx} style={{"--i": idx + 1}}>
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                    {/*
                                    <button className="button">
                                        <span className="slider__button-text">More..</span>
                                    </button>
                                    */}
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                )}
                </Swiper>
            </div>
        </main>

    );
};