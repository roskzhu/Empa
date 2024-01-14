import React, { useEffect, useRef } from 'react';
import createEmotionRadarChart from '../components/emotionRadar.js';
import '../components/emotionRadar.css';
import CameraFeed from '../components/CameraFeed.js';
import '../components/CameraFeed.css';

const Main = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Dummy emotion data
    const emotionData = [60, 30, 10, 7, 3, 0, 0];

    if (canvasRef.current) {
      // Destroy the previous chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      chartRef.current = createEmotionRadarChart(canvasRef.current, emotionData);
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Add dependencies if needed

  return (
    <div className="main-container">
      <div className="camera-container">
        <CameraFeed />
      </div>
      <div className="sidebar">
        <div className='logo'>
          <h1>empa</h1>
        </div>
        <canvas ref={canvasRef} className="emotion-radar-canvas"></canvas>
        <div>
          <p>audio transcription to go here</p>
        </div>
        <div>
          <p>OpenAI info to go here</p>
        </div>
      </div>
    </div>
  );
  
};

export default Main;
