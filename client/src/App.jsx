import React, { useEffect, useRef } from 'react';
import createEmotionRadarChart from './components/emotionRadar';

const App = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Dummy emotion data
    const emotionData = [60, 30, 5, 2, 1, 1, 1];

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
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
