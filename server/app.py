from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import openai


app = Flask(__name__)

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
    prompt = f"Generate phrases to address/soothe someone feeling {emotion}."
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=150,
        n=5,
        stop=None,
    )
    phrases = [choice['text'].strip() for choice in response['choices']]
    return phrases

@app.route('/generate_phrases', methods=['POST'])
def generate_phrases():
    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'Missing "text" parameter'}), 400

    text = data['text']
    emotion = analyze_emotion(text)
    generated_phrases = generate_phrases_for_emotion(emotion)

    return jsonify({'phrases': generated_phrases})

if __name__ == '__main__':
    app.run(debug=True)
