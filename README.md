# empathy-enhancer
shehacks 8

react typescript

python flask

mediapipe

the csv from landmarking for mediapipe:
- x is the emotion (label) for the image
- y are facial coordinates per image

## How it works
- Flask backend
- Vanilla React frontend

### How we trained the model
- `landmarking.ipynb` -> Downloaded FER2013 dataset (imgs), and used Mediapipe to landmark 463 facial points, writing this to a CSV (`fer2013_landmarks_nopathsfixed.csv`)
- `landmarking_model` -> Trained custom model using Tensorflow and Sci-kit Learn, using landmarked data from the CSV

## Features
- Radar chart showing emotion metrics
- Transcribed audio to text, and recommended phrases for the emotion detected/expressed
- Intuitive GUI and beautiful gorgeous perfect frontend design




## Getting Started

### Starting the server

_(127.0.0.1:5000 by default)_

1. `cd server`
1. `python3 -m venv venv`
1. `source venv/bin/activate` (MacOS)
1. `venv\Scripts\activate` (Windows Powershell)
1. `pip install -r requirements.txt`
1. `python3 app.py`

### Starting the app

_(localhost:3000 by default)_

1. `cd client`
1. `npm install`
1. `npm start`
