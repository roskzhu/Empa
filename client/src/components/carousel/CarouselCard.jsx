import React from 'react'
import styled from '@emotion/styled'
import './carousel.css'; 

const CarouselCard = ({ card }) => {
  return (
    <div className="m-1 rounded-xl hover:bg-black/10 p-5 min-h-[440px]">
      <div className="reverse-gradient h-[170px]">
        <img src={card.image} alt={card.content} />
      </div>
      <p className='text-3xl font-extrabold my-10 text-black/80'>{card.content}</p>
      <p className='answer'>{card.answer}</p>
    </div>
  )
}

export default CarouselCard