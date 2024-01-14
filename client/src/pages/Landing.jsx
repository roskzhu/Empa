import React from 'react';

const Landing = () => {
  const redirectToMain = () => {
    window.location.href = '/Main';
  };

  return (
    <div className="content">
    <div className='gradient-container'>
        <h1 className='gradient-text'>empa</h1>
    </div>
    <h2 className='subtitle'>your emotional intelligence partner</h2>
    <div className='explore-container'>
    <div className='blurb'>
        <p> Unlock the power of non-verbal communication with Empa – the cutting-edge tool designed to decode emotions in audio and video expressions. </p>
        <p> Gain real-time insights into the unspoken language, receiving personalized feedback to enhance your communication skills in virtual meetings, presentations, and interviews. 
            Empa not only deciphers emotions but provides actionable insights on addressing specific feelings effectively, empowering you to build stronger connections. 
        </p>
    </div>
        <button className='explore-button' onClick={redirectToMain}>
            explore
        </button>
    </div>
    <div className='blob-container'>
        <img className='blob' src='/blob1.png' alt='Image Description'/>
    </div>
    </div>
  );
};

export default Landing;

