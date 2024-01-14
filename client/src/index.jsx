import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from "@react-three/fiber";
import Blob from "./components/Blob"; // Adjust the path if necessary
import './index.css';
import App from './App'; // Ensure App is the correct parent component
import reportWebVitals from './reportWebVitals';
import 'chart.js/auto';
import './App.css'; // Path to your main CSS file

// Home Component
export default function Home() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
        <Blob />
      </Canvas>
    </div>
  );
}

// Main Entry Point
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App /> {/* Make sure Home is rendered inside App */}
  </React.StrictMode>
);

reportWebVitals();
