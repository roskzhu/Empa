import React from 'react';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = '/Main';
  };

  return (
    <div className="bg-gradient-to-r from-white via-white to-blue-100 m-0 p-20 v">
      <h2 className='subtitle'>
        Your Emotional Intelligence partner
      </h2>
      <div className='gradient-container my-70'>
        Meet
          <h1 className='gradient-text text-9xl my-8'>empa</h1>
      </div>
      <div className='blurb'>
          {/* <p> Unlock the power of non-verbal communication with Empa – the cutting-edge tool designed to decode emotions in audio and video expressions. 
              Gain real-time insights into the unspoken language, receiving personalized feedback to enhance your communication skills in virtual meetings, presentations, and  Chillaxviews. 
              Empa not only deciphers emotions but provides actionable insights on addressing specific feelings effectively, empowering you to build stronger connections. 
          </p> */}
      </div>
          <button onClick={redirectToMain}>
              click (MAYA FIX BUTTON)
          </button>
        <div className='blob-container'>
          <img className='blob' src='/blob1.png' alt='Image Description'/>
        </div>
    </div>
  );
};

export default Landing;

