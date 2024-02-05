import React from 'react';
import Carousel from '../components/carousel/CarouselWrapper';
import { Link } from 'react-router-dom';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = "/Main";
  };

  return (
    <div className="">
    <div className="background-gradient m-0 p-14 flex">
      <div className="pb-32">
        <div
          className="text-md mt-[150px] font-extrabold border-black/80 border-2
                      rounded-full px-3 text-black/80 w-[140px]"
        >
          Meet <span className="gradient-text my-8 pr-2">empa</span> {"ᐳ"}
        </div>

        <h2 className="text-black/80 font-extrabold text-5xl w-[50%] py-4 leading-snug">
          Your Emotional Intelligence Partner.
        </h2>

        <div className="blurb">
          <p className="text-black/65 text-xl leading-relaxed font-medium pb-12 w-1/2">
            {/* Unlock the power of non-verbal communication with Empa – the cutting-edge tool designed to decode emotions in audio and video expressions.  */}
            Gain real-time insights into the unspoken language, receiving
            personalized feedback to enhance your communication skills in
            virtual meetings, presentations, and interviews.
            {/* Empa not only deciphers emotions but provides actionable insights on addressing specific feelings effectively, empowering you to build stronger connections.  */}
          </p>
      </div>
        <button className='explore-button font-extrabold rounded-full text-xl p-5 px-6' 
              onClick={redirectToMain}>
            Explore now
        </button>
        </div>
        <div className='absolute justify-end flex align-center pt-40 pl-20'>
          <img className='w-1/3' src='/assets/blob1.png' alt='Image Description'/>
        </div>

    </div>
    <Carousel/>
    </div>
  );
};

export default Landing;
