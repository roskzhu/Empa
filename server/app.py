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

def generate_phrases_for_emotion(emotion):
    prompt = f"Generate phrases to address/soothe someone feeling {emotion}."
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        n=5,
        stop=None,
    )
    phrases = [choice['text'] for choice in response['choices']]
    return phrases

@app.route('/generate_phrases', methods=['POST'])
def generate_phrases():
    data = request.get_json()

    if 'emotion' not in data:
        return jsonify({'error': 'Missing "emotion" parameter'}), 400

    emotion = data['emotion']
    generated_phrases = generate_phrases_for_emotion(emotion)

    return jsonify({'phrases': generated_phrases})

if __name__ == '__main__':
    app.run(debug=True)
