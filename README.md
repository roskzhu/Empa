<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px; font-size:60pt;">Empa</h1></summary>
      </ul>
    </div>
    <h3>Your Emotional Intelligence Partner</h3>
    <h4><i>🏅 1st Place SheHacks Winner</i></h4>
   <br>
    <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"/>
    <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white"/>
    <img src="https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white"/>
    <img src="https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
    <!--     <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white"/> -->
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <br><br>
</div>

![image](https://github.com/roskzhu/Empa/assets/110139243/69dcafa4-f4e0-404b-be2d-c92247d32c6c)

**DEMO VIDEO (turn captions on!): https://youtu.be/p0rzJLvPM_A**

Empa is a full-stack web application that leverages computer vision and machine learning to analyze facial expressions and translate them into recognizable emotions. It's designed to assist individuals with communication disorders in social interactions, help those on the autism spectrum understand emotional cues, and enhance empathy in diverse, cross-cultural communications.

## Features
- **Real-time emotion recognition** from **live facial facial footage** using our _custom-trained_ model.
- **Radar chart** showing emotion metrics (Measured with the confidence level of each emotion).
- Recommended responses from the detected emotion using **transcribed audio to text** (i.e. if you say a phrase expressing anger, the app shows ways you can say to soothe that person).


## Built with
- Flask backend
- Python + Jupyter notebook to train the model
- Vanilla React frontend styled with Tailwind CSS
  
### How we trained the model
- `landmarking.ipynb` -> Downloaded FER2013 dataset (imgs), and used Mediapipe to landmark 463 facial points, writing this to a CSV (`fer2013_landmarks_nopathsfixed.csv`)
- x is the emotion (label) for the image
- y are facial coordinates per image
- `landmarking_model` -> Trained custom model using Tensorflow and Sci-kit Learn, using landmarked data from the CSV


## Architecture Overview
![Empa drawio](https://github.com/roskzhu/Empa/assets/121539073/f486d9fd-99dc-4e8b-8646-67012babde21)


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
![image](https://github.com/roskzhu/Empa/assets/110139243/6abaec4c-3acb-4fe6-b937-90f18bde2050)


## Next Steps
- [X] Radar chart updating live on real-time footage
- [ ] Adding detection for emotions detected in vocal tone & body language for improved conversation suggestions
- [ ] Adding accounts and database?
- [ ] Deployment
- [ ] Demo Video
