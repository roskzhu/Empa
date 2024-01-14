import React from 'react';
import Carousel from '../components/carousel/CarouselWrapper';
import { Link } from 'react-router-dom';
// import Carousel from '../components/carousel/CarouselWrapper';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = "/Main";
  };

  return (
    <div className="background-gradient m-0 p-14 h-screen flex">
      <div>
        <div
          className="text-md mt-[150px] font-extrabold border-black/80 border-2
                      rounded-full px-3 text-black/80 w-[140px]"
        >
          Meet <span className="gradient-text my-8 pr-2">empa</span> {"ᐳ"}
        </div>

       {/* <div className='blurb'>
           <p className="text-black/60 text-3xl leading-relaxed font-medium pb-20 w-1/2">  */}

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
        <Link className='explore-button font-extrabold rounded-full text-xl p-5 px-6' 
              onClick="{redirectToMain}">
            Explore now
        </Link>
        </div>
        <div className='absolute justify-end w-full flex align-center pt-40 pr-40'>
          <img className='w-1/3' src='/blob1.png' alt='Image Description'/>
        </div>

        {/* <Carousel/> */}
    </div>
  );
};

export default Landing;
