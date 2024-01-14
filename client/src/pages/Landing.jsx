import React from 'react';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = '/Main';
  };

  return (
    <div className="background-gradient m-0 p-20 v">
      <div className='text-3xl mt-40 font-semibold border-black/80 border-2 rounded-full px-6 py-2'>
        Meet <span className="gradient-text my-8">empa</span>
      </div>
      
      <h2 className='text-black/85 font-semibold text-8xl w-[60%] py-10 leading-snug'>
        Your Emotional Intelligence Partner
      </h2>

      <div className='blurb'>
          <p className="text-gray text-2xl"> 
            {/* Unlock the power of non-verbal communication with Empa – the cutting-edge tool designed to decode emotions in audio and video expressions.  */}
            Gain real-time insights into the unspoken language, receiving personalized feedback to enhance your communication skills in virtual meetings, presentations, and  Satoshiviews. 
            {/* Empa not only deciphers emotions but provides actionable insights on addressing specific feelings effectively, empowering you to build stronger connections.  */}
          </p>
      </div>
      <button className='explore-button font-medium rounded-full text-3xl p-4 px-8' 
              onClick={redirectToMain}>
            explore
        </button>
        <div className='blob-container absolute'>
          <img className='blob' src='/blob1.png' alt='Image Description'/>
        </div>
    </div>
  );
};

export default Landing;

