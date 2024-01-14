import React from 'react'
import styled from '@emotion/styled'

const CarouselCard = ({card}) => {
  return (
    <div className="m-2 border-rounded">
      <div className="bg-blue-200">
        img here
      </div>
      <p className='content'>{card.content}</p>
      <p className='answer'>{card.answer}</p>
    </div>
  )
}

const CardContainer = styled.div`
  height: 300px;
  width: calc(95% - 80px);
  display: grid;
  background-color: #F5F5F7;
  border-radius: 8px;
  margin-left: 20px;
  font-weight: 600;
  font-size: 35px;
  position: relative;
  padding: 40px;
  align-items: center;
  .answer {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    opacity: 0;
    transition: opacity 300ms;
    font-size: 2em;
    text-align: center;
    justify-content: center;
  }
  .content {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    transition: opacity 300ms;
  }
  :hover {
    .content {
      opacity: 0;
    }
    .answer {
      opacity: 1;
    }
    background-image: linear-gradient(to bottom right, #FCA27C, #FF5AB4);
    color: white;
  }
  span {
    background-image: linear-gradient(to bottom right, #FCA27C, #FF5AB4);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
  }
`

export default CarouselCard