import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import Swiper from 'react-slick';
import './carousel.module.css';
import CarouselCard from './CarouselCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Settings } from 'react-slick';

// interface Metrics {
//   _id: string;
//   organization_Name: string;
//   overnight_Service_Type: string;
//   program_Model: string;
//   service_User_Count: number;
//   capacity_Actual_Room: number;
// }

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    className: 'test',
    centerMode: false,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 1024, // md and above
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // sm
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slider = useRef<Swiper | null>(null);

  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/metrics');
        console.log(response.data);
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-[40px]">
        <Swiper ref={slider} {...settings}>
          {metrics.map((card, index) => (
            <CarouselCard card={card} key={index} />
          ))}
        </Swiper>

        <div className="flex justify-center mt-4">
          <button className="carousel-control" onClick={() => slider.current?.slickPrev()}>
            <IoIosArrowBack style={{ color: 'white', marginRight: '25px' }} />
          </button>
          <button className="carousel-control" onClick={() => slider.current?.slickNext()}>
            <IoIosArrowForward style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
