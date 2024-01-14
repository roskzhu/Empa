import React from 'react'
import styled from '@emotion/styled';
import Swiper from "react-slick";
import './carousel.css';
import CarouselCard from './CarouselCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    className: "hey"
  };

  const slider = React.useRef(null);

  return (
    <div className="pt-20 justify-center">
      <Swiper ref={slider} {...settings}>
        {cards.map((card, index) => (
          <CarouselCard
            card={card} 
            key={index}
          />
        ))}
      </Swiper>

      <div className="flex justify-center">
        <button 
          className="carousel-control" 
          onClick={() => slider?.current?.slickPrev()}
        >
          <IoIosArrowBack/>
        </button>
        <button 
          className="carousel-control" 
          onClick={() => slider?.current?.slickNext()}
        >
          <IoIosArrowForward/>
        </button>

      </div>
    </div>
  )
}

const cards = [
  {
    content: "Social Interaction Aid",
    answer: "Assists individuals with social communication disorders in interpreting and responding to others' emotions effectively."
  },
  {
    content: "Accessible Mental Health Monitoring",
    answer: "Assists in monitoring and understanding emotional changes in individuals with mental health conditions that affect emotional expression or recognition."
  },
  {
    content: "Emotional Education for Children",
    answer: " Aids in teaching children, especially those with developmental challenges, about emotions and facial expressions."
  },
  {
    content: "Virtual Learning Companion",
    answer: "Integrates with online learning platforms to help students with emotional and social learning difficulties."
  },
  {
    content: "Cross-Cultural Communication",
    answer: "Assists in bridging gaps in emotional expression understanding across different cultures, enhancing empathy in diverse environments."
  },
]
export default Carousel