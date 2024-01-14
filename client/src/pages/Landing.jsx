import React from 'react';
import Carousel from '../components/carousel/CarouselWrapper';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = '/Main';
  };

  return (
    <div className="background-gradient m-0 p-20 h-screen flex">
      <div>
      <div className='text-2xl mt-[240px] font-extrabold border-black/80 border-[3px] 
                      rounded-full px-4 py-1 text-black/80 w-[200px]'>
        Meet <span className="gradient-text my-8 pr-2">empa</span> {'ᐳ'}
      </div>
      
      <h2 className='text-black/85 font-extrabold text-7xl w-[50%] py-6 leading-snug'>
        Your Emotional Intelligence Partner.
      </h2>

      <div className='blurb'>
          <p className="text-black/60 text-3xl leading-relaxed font-medium pb-10 w-1/2"> 
            {/* Unlock the power of non-verbal communication with Empa – the cutting-edge tool designed to decode emotions in audio and video expressions.  */}
            Gain real-time insights into the unspoken language, receiving personalized feedback to
            enhance your communication skills in virtual meetings, presentations, and interviews. 
            {/* Empa not only deciphers emotions but provides actionable insights on addressing specific feelings effectively, empowering you to build stronger connections.  */}
          </p>
      </div>
      <button className='explore-button font-semibold rounded-full text-3xl p-6 px-9' 
              onClick={redirectToMain}>
            Explore now
        </button>
        </div>
        <div className='absolute justify-end w-full flex align-center pt-60 pr-60'>
          <img className='w-1/3' src='/blob1.png' alt='Image Description'/>
        </div>

        <Carousel/>
    </div>
  );
};

export default Landing;

