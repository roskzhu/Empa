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
      fetch("http://localhost:5000/generate_phrases", {
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

  const test = {
    phrases: [
      "1. That's fantastic! \n2. I'm so happy for you! \n3. It's so great to see you smiling! \n4. Yay, that's amazing news! \n5. Your positivity is infectious. \n6. I'm overjoyed for you! \n7. This is definitely a reason to celebrate. \n8. You deserve all the happiness and more. \n9. I can't help but feel happy when you're so joyful. \n10. Your positivity is radiating and it's contagious.",
      '1. "That\'s amazing, I\'m so happy for you!" \n2. "Wow, that must feel incredible!" \n3. "Congratulations, you deserve all the happiness in the world!" \n4. "I can feel your excitement, it\'s contagious!" \n5. "I\'m thrilled to hear that, it\'s wonderful news!" \n6. "What a wonderful reason to celebrate!" \n7. "I\'m so happy to see you so joyful!" \n8. "Your happiness is contagious, it\'s impossible not to feel it too!" \n9. "This is such a great moment, let\'s soak it all in!" \n10. "You have every reason to be overjoyed, way to go!"',
      '1. "That\'s amazing, you deserve to feel so joyful right now!" \n2. "I\'m so happy for you, this is such a positive moment!" \n3. "Your positivity is infectious, I can\'t help but smile too!" \n4. "I can see the joy radiating from you, it\'s contagious!" \n5. "This is a great reason to celebrate, let\'s do something to keep the positive vibes going!" \n6. "You have every reason to feel positive, you\'ve worked so hard for this moment!" \n7. "You\'re glowing with happiness, and it\'s a beautiful sight!" \n8. "I\'m thrilled to see you in such a positive state, it\'s uplifting',
      "1. That's fantastic news! \n2. I'm so happy for you! \n3. Congratulations, you deserve it! \n4. Your energy is contagious. \n5. It's wonderful to see you so full of joy. \n6. Keep spreading that happiness. \n7. I can't help but smile when I see you so happy. \n8. This calls for a celebration! \n9. You are glowing with positive energy. \n10. Your positive attitude can light up a room. \n11. It's a pleasure to be around you when you're so joyful. \n12. What's making your heart so full? \n13. I'm here to share in your happiness. \n14. Your positivity is",
      '1. "I am so happy to see you feeling so positive!"\n2. "Your positivity is contagious, thank you for spreading joy!"\n3. "What\'s making you feel so joyful today?"\n4. "Your smile is radiating happiness, I love it!"\n5. "Keep riding this wave of positivity, it suits you well."\n6. "I\'m glad to see you\'re in such a great mood."\n7. "Your positive energy is lighting up the room!"\n8. "You deserve all the happiness and joy in the world."\n9. "I am grateful to have such a positive person in my life."\n10. "Your positive outlook on life is truly inspiring."\n11. "Wishing you endless moments of joy',
    ],
  };

  return (
    <div
      className="Main"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1 }}>
        <Webcam
          ref={webcamRef}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            width: "100%",
            height: "auto",
          }}
        ></canvas>
      </div>

      <div className="emotion-radar-chart">
        <canvas
          ref={emotionCanvasRef}
          className="emotion-radar-canvas"
        ></canvas>
      </div>

      <div className="transcription-container">
        <div className="button-container">
          <button onClick={startTranscription} disabled={isTranscribing}>
            Start Transcription
          </button>
          <button onClick={stopTranscription} disabled={!isTranscribing}>
            Stop Transcription
          </button>
        </div>

        {transcript && (
          <div className="transcript">
            <p>{transcript}</p>
          </div>
        )}
        {serverResponse && (
          <div>
            <h3>Suggested phrases:</h3>
            <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
          </div>
        )}
        {/* {test && test.map((list, index) => (
        <div key={index} >
          <pre>{JSON.stringify(list, null, 2)}</pre>
        </div>
      ))} */}
      </div>
    </div>
  );
}

export default Main;
