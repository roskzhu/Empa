<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px; font-size:60pt;">Empa</h1></summary>
      </ul>
    </div>
    <h3>Your Emotional Intelligence Partner</h3>
<!--     <h4><i>xxx</i></h4> -->
   <br>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"/>
    <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white"/>
    <img src="https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
    <!--     <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white"/> -->
    <br><br>
</div>

![image](https://github.com/roskzhu/Empa/assets/110139243/69dcafa4-f4e0-404b-be2d-c92247d32c6c)

(insert demo video if possible here

(insert a short description/hook here)


## Features
- Radar chart showing emotion metrics
- Transcribed audio to text, and recommended phrases for the emotion detected/expressed
- Intuitive GUI and beautiful gorgeous perfect frontend design
(to be added)


## How it works
- Flask backend
- Vanilla React frontend

### How we trained the model
- `landmarking.ipynb` -> Downloaded FER2013 dataset (imgs), and used Mediapipe to landmark 463 facial points, writing this to a CSV (`fer2013_landmarks_nopathsfixed.csv`)
- x is the emotion (label) for the image
- y are facial coordinates per image
- `landmarking_model` -> Trained custom model using Tensorflow and Sci-kit Learn, using landmarked data from the CSV


## Architecture Overview
(to be added)


## Getting Started

### Prerequisites
1. Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Python](https://www.python.org/) and [pip](https://pip.pypa.io/en/stable/) installed for the backend.

2. Install required dependencies in root folder and both frontend and backend folders
```
npm install
```

3. Create a `.env` file in this folder with the following variables:
```
OPENAI_API_KEY={YOUR_API_KEY}
```

### Starting the server

_(127.0.0.1:5000 by default)_

1. `cd server`
2. `python3 -m venv venv`
3. `source venv/bin/activate` (MacOS)
4. `venv\Scripts\activate` (Windows Powershell)
5. `pip install -r requirements.txt`
6. `python3 app.py`

### Starting the app

_(localhost:3000 by default)_

1. `cd client`
2. `npm install`
3. `npm start`



### Sneak Peak
(add imgs from frontend here)

## Next Steps
- [X] text
- [ ] add firebase for accounts and database if needed???
- [ ] deployment
- [ ] we should add these to show scalability :)
