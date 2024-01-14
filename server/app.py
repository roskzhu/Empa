from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import speech_recognition as sr
import transcribe
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load environment variables from .env
load_dotenv()

# Get your OpenAI API key from an environment variable
api_key = os.environ.get('OPENAI_API_KEY')
print(api_key)

# Check if the API key is available
if api_key is None:
    raise ValueError("OpenAI API key is not set in the environment variable OPENAI_API_KEY")


# Function to determine emotion from text
def analyze_emotion(text):
    prompt = f"Determine the emotion expressed in the following text: {text}"
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=150,
    )
    emotion = response['choices'][0]['text'].strip()
    return emotion

def generate_phrases_for_emotion(emotion):
    prompt = f"Generate phrases to respond to someone feeling {emotion}."
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=150,
        n=5,
        stop=None,
    )
    phrases = [choice['text'].strip() for choice in response['choices']]
    return phrases

# Generates phrases to respond to someone's feelings.
@app.route('/generate_phrases', methods=['POST'])
def generate_phrases():
    text = request.json['transcript']
    # print(f"Transcript received: {text}")  # You can handle the transcript here as per your requirements

    if text == "":
        return jsonify({'error': 'Missing "text" parameter'}), 400

    emotion = analyze_emotion(text)
    generated_phrases = generate_phrases_for_emotion(emotion)
    print('generated_phrases: ', generated_phrases)

    return jsonify({'phrases': generated_phrases})

# Endpoint to receive facial landmarking data from client
# Load your model
with open('empa_model5.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/receive_data', methods=['POST'])
def receive_data():
    try:
        # Receive JSON data
        data = request.json
        landmarks = data.get('landmarks', [])
        
        # Flatten the landmarks and create DataFrame
        landmarks_flat = [coord for sublist in landmarks for dct in sublist for coord in (dct['x'], dct['y'], dct['z'])]
        df = pd.DataFrame([landmarks_flat])
        
        # Ensure columns match model's expectations
        # Assuming model expects columns named 'x1', 'y1', 'z1', etc.
        df.columns = [f'{axis}{i}' for i in range(1, 469) for axis in ('x', 'y', 'z')]

        # Predict probabilities
        probabilities = model.predict_proba(df)
        probabilities_list = probabilities.tolist()

        # Return the probabilities in the response
        return jsonify({'probabilities': probabilities_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

if __name__ == '__main__':
    app.run(debug=True)
