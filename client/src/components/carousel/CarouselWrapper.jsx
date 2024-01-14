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
    // <CarouselContainer>
    <div className="pt-20 justify-center">
      <Swiper ref={slider} {...settings}>
        {cards.map((card, index) => (
          <CarouselCard
            card={card} 
            key={index}
          />
        ))}
      </Swiper>

      <CarouselControlContainer>
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

      </CarouselControlContainer>
      
    {/* </CarouselContainer> */}
    </div>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-top: -40px;
`

const CarouselControlContainer = styled.div`
  align-self: center;
  display: flex;
`

const cards = [
  {
    content: "Social Interaction Aid",
    answer: "text"
  },
  {
    content: "text",
    answer: "of course"
  },
  {
    content: "text",
    answer: "definitely"
  },
  {
    content: "text",
    answer: "for sure"
  },
  {
    content: "text",
    answer: "on god"
  },
]
export default Carousel