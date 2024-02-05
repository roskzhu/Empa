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
import createEmotionRadarChart from "../components/emotionRadar";
import "../components/emotionRadar.css";
import "./Main.css";

function Main() {
  const [showWebcam, setShowWebcam] = useState(false);

  const handleToggle = () => {
    setShowWebcam((prevShowWebcam) => !prevShowWebcam);
  };

  // Emotion Radar Chart
  const emotionCanvasRef = useRef(null);
  const chartRef = useRef(null);

  let probabilities = [0, 10, 0, 0, 0, 0, 0];

  useEffect(() => {
    if (emotionCanvasRef.current) {
      // Destroy the previous chart
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      chartRef.current = createEmotionRadarChart(
        emotionCanvasRef.current,
        probabilities
      );
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Face Landmarking
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  var camera = null;

  const landmarkDataRef = useRef([]); // Ref to store the latest landmark data

  // require('dotenv').config();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  // const apiUrl = "process.env.TEST";


  const sendLandmarkData = () => {
    console.log(landmarkDataRef.current);
    axios
      .post("http://127.0.0.1:5000/receive_data", {
        landmarks: landmarkDataRef.current,
      })
      .then((response) => {
        console.log("Data sent successfully");
        probabilities = response.data.probabilities;
        console.log("Probabilities:", probabilities);
        // console.log("env var: ", process.env.TEST)

        if (probabilities) {
          if (emotionCanvasRef.current) {
            // Destroy the previous chart
            if (chartRef.current) {
              chartRef.current.destroy();
              console.log("chartRef.current:", chartRef.current);
            }

            // Create a new chart
            chartRef.current = createEmotionRadarChart(
              emotionCanvasRef.current,
              probabilities
            );
            console.log("emotionCanvasRef.current:", emotionCanvasRef.current);
          }
        } else {
          console.error(
            "Received undefined or invalid probabilities from the server."
          );
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  if (emotionCanvasRef.current) {
    // Destroy the previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart
    chartRef.current = createEmotionRadarChart(
      emotionCanvasRef.current,
      // emotionData
      probabilities
    );
  }

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

  // Audio Transcription
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Define a state variable to store the server response
  const [serverResponse, setServerResponse] = useState(null);

  const generatePhrasesUrl = `${serverUrl}/generate_phrases`;

  const startTranscription = () => {
    setIsTranscribing(true);

    console.log("Starting transcription");

    // Initialize speech recognition
    let recognition;
    if ("SpeechRecognition" in window) {
      recognition = new window.SpeechRecognition();
    } else if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
    } else {
      console.error("Speech recognition not supported");
      return;
    }

    console.log("recognition: ", recognition);

    recognition.lang = "en-US";
    recognition.start();

    console.log("Ready to receive a command.");

    recognition.onresult = function (event) {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      console.log("Transcript:", speechToText);

      // Send the transcript to the server
      // fetch("http://localhost:5000/generate_phrases", {
      fetch(`https://empa-production.up.railway.app/generate_phrases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: speechToText }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Assuming the server responds with JSON
          } else {
            console.error("Failed to send transcript to the server");
          }
        })
        .then((data) => {
          // Handle the data received from the server
          console.log("Server Response:", data);

          // Update the state with the server response
          setServerResponse(data);
        })
        .catch((error) => {
          console.error("Error sending transcript:", error);
        });
    };
  };

  const stopTranscription = () => {
    setIsTranscribing(false);
  };

  const json_string_data = JSON.stringify(serverResponse, null, 2);
  // console.log('ser[0]: ', serverResponse.phrases);

  // State to manage the input message
  const [message, setMessage] = useState("");

  // Event handler for sending a message from text box
  const sendMessage = () => {
    console.log("Message sent:", message);

    // Call the generate_phrases endpoint with the message
    axios
      .post(`${generatePhrasesUrl}`, {  // https://empa-production.up.railway.app/generate_phrases
        transcript: message,
      })
      .then((response) => {
        console.log("Message processed successfully", response.data);
        // Update the server response with the returned data
        setServerResponse(response.data);
      })
      .catch((error) => {
        console.error("Error processing message:", error);
      });
    // Add your logic here to handle the message (e.g., send it to the server)
  };

  return (
    <div className="background-gradient p-20 pt-[110px]">
      <div className="Main grid grid-cols-5 gap-4">
        <div className="webcam-container flex col-span-3">
          {showWebcam && (
            <Webcam
              ref={webcamRef}
              style={{ width: "100%", borderRadius: "12px" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <Webcam ref={webcamRef} style={{ width: "100%", height: "auto" }} />

            <canvas
              ref={canvasRef}
              style={{
                display: showWebcam ? "none" : "block",
                width: "100%",
              }}
            />

            {/* <button
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 1,
              }}
              onClick={handleToggle}
            >
              toggle
            </button> */}
          </div>
        </div>
        <div className="bg-white flex col-span-2 rounded-xl justify-center">
          <div className="emotion-radar-chart">
            <canvas
              ref={emotionCanvasRef}
              className="emotion-radar-canvas"
            ></canvas>
          </div>
       {/* <div>
        <p>API URL: {apiUrl}</p>
          </div> */}
        </div>

        <div className="justify-end w-full right-0 relative ml-[950px] flex">
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              className="h-[120px] p-8 rounded-3xl"
            />
            <button
              onClick={sendMessage}
              className="explore-button rounded-full mt-4"
            >
              Send Message
            </button>
          </div>

          <div className="flex">
            <div className="transcription-container">
              <div className="flex gap-4">
                <button
                  onClick={startTranscription}
                  disabled={isTranscribing}
                  className="explore-button rounded-full"
                >
                  Start Transcription
                </button>
                <button
                  onClick={stopTranscription}
                  disabled={!isTranscribing}
                  className="explore-button rounded-full"
                >
                  Stop Transcription
                </button>
              </div>
              {transcript && (
                <div className="text-black">
                  <h3 className="text-black">Transcription:</h3>
                  <p>{transcript}</p>
                </div>
              )}
            </div>

            <div className="suggestion-container text-black">
              <h3 className="text-black max-w-[200px]">Suggested phrases:</h3>
              {serverResponse && (
                <div className="text-black">
                  {/* <pre>{JSON.stringify(serverResponse, null, 2)}</pre> */}
                  {/* <pre>{serverResponse && serverResponse[0]}</pre> */}

                  {serverResponse.phrases.map((str, index) => (
                    <div key={index}>{str}</div>
                  ))}
                </div>
              )}
              {/* <h3>
              {test}
            </h3> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
