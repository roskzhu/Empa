from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import speech_recognition as sr
import transcribe

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
    print(f"Transcript received: {text}")  # You can handle the transcript here as per your requirements

    if text == "":
        return jsonify({'error': 'Missing "text" parameter'}), 400

    emotion = analyze_emotion(text)
    generated_phrases = generate_phrases_for_emotion(emotion)

    return jsonify({'phrases': generated_phrases})

# Endpoint to receive facial landmarking data from client
@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json
    print(data)  # This will print the data to the console
    return jsonify({'message': 'Data received successfully!'})
    

if __name__ == '__main__':
    app.run(debug=True)
