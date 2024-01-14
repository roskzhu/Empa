import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import {
  FACEMESH_TESSELATION,
  FACEMESH_RIGHT_EYE,
  FACEMESH_RIGHT_EYEBROW,
  FACEMESH_LEFT_EYE,
  FACEMESH_LEFT_EYEBROW,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from "@mediapipe/face_mesh";
import axios from "axios";

function Main() {
  // Face Landmarking
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  var camera = null;

  const landmarkDataRef = useRef([]); // Ref to store the latest landmark data

  const sendLandmarkData = () => {
    console.log(landmarkDataRef.current);
    axios
      .post("http://127.0.0.1:5000/receive_data", {
        landmarks: landmarkDataRef.current,
      })
      .then((response) => {
        console.log("Data sent successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (landmarkDataRef.current.length > 0) {
        sendLandmarkData();
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  function onResults(results) {
    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {
          color: "#FF3030",
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {
          color: "#FF3030",
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {
          color: "#30FF30",
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {
          color: "#30FF30",
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
          color: "#E0E0E0",
        });
        drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {
          color: "#E0E0E0",
        });
      }
      landmarkDataRef.current = results.multiFaceLandmarks.map((landmarks) =>
        landmarks.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
      );
    }
    canvasCtx.restore();
  }
  // }

  // setInterval(())
  useEffect(() => {
    // Initialize faceMesh inside useEffect
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (webcamRef.current) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);



  // AUDIO TRANSCRIPTON

  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const startTranscription = () => {
    setIsTranscribing(true);
    
    console.log('Starting transcription');

    // Initialize speech recognition
    let recognition;
    if ('SpeechRecognition' in window) {
      recognition = new window.SpeechRecognition();
    } else if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
    } else {
      console.error('Speech recognition not supported');
      return;
    }

    console.log('recognition: ', recognition);    

    recognition.lang = 'en-US';
    recognition.start();

    console.log('Ready to receive a command.');

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      console.log("Transcript:", speechToText);

      // Send the transcript to the server
      fetch('http://localhost:5000/generate_phrases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: speechToText }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Transcript sent to the server successfully');
          } else {
            console.error('Failed to send transcript to the server');
          }
        })
        .catch((error) => {
          console.error('Error sending transcript:', error);
        });
    };
  };

  const stopTranscription = () => {
    setIsTranscribing(false);
  };

  return (
    <center>
      <div className="Main">
        {/* <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />{" "}
        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas> */}

        <button onClick={startTranscription} disabled={isTranscribing}>
          Start Transcription
        </button>
        <button onClick={stopTranscription} disabled={!isTranscribing}>
          Stop Transcription
        </button>
        {transcript && (
          <div>
            <h3>Transcription:</h3>
            <p>{transcript}</p>
          </div>
        )}
      </div>
    </center>
  );
}

export default Main;
