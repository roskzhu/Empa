import React from 'react'
import styled from '@emotion/styled'
import './carousel.css'; 

const CarouselCard = ({card}) => {
  return (
    <div className="m-2 border-rounded">
      <div className="bg-blue-200">
        img here
      </div>
      <p className='text-3xl font-extrabold my-10 text-black/80'>{card.content}</p>
      <p className='answer'>{card.answer}</p>
    </div>
  )
}
export default CarouselCard