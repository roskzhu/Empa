import React, { useRef, useEffect } from 'react';

const CameraFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startVideo();
  }, []);

  return <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>;
};

export default CameraFeed;
