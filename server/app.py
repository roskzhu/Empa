from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import speech_recognition as sr
# import pyttsx3 
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

# Function to transcribe audio to text
# def transcribe_text():
#     r = sr.Recognizer() 
 
#     def SpeakText(command, rate):
#         engine = pyttsx3.init()

#         # setting how fast it picks up audio
#         engine.setProperty('rate', rate)

#         engine.say(command) 
#         engine.runAndWait()

#     while True:
#         try:
#             with sr.Microphone() as source2:
#                 r.energy_threshold = 15000
#                 r.adjust_for_ambient_noise(source2, duration=0.1)
#                 audio2 = r.listen(source2)  # Set a shorter timeout

#                 MyText = r.recognize_sphinx(audio2)
#                 MyText = MyText.lower()

#                 print("Did you say:", MyText)
#                 SpeakText(MyText, rate=2000)  # Increase the speech rate if needed

#         except sr.RequestError as e:
#             print("Could not request results; {0}".format(e))
#         except sr.WaitTimeoutError as e:
#             print("Listening timed out while waiting for phrase to start")
#         except sr.UnknownValueError:
#             continue



@app.route('/generate_phrases', methods=['POST'])
def generate_phrases():
    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'Missing "text" parameter'}), 400

    text = data['text']
    emotion = analyze_emotion(text)
    generated_phrases = generate_phrases_for_emotion(emotion)

    return jsonify({'phrases': generated_phrases})

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json
    print(data)  # This will print the data to the console
    return jsonify({'message': 'Data received successfully!'})

# # Endpoint to transcript audio to text
# @app.route('/transcribe', methods=['POST'])
# def transcribe_to_audio():
#     # Assuming the audio file is sent as a POST request
#     # audio_data = request.files['audio'].read()
    
#     # # Call your transcription function
#     # transcribed_text = transcribe_audio(audio_data)

#     # return jsonify({'transcription': transcribed_text})
#     try:
#         audio_data = request.files['audio'].read()
#         transcription = transcribe.transcribe_audio(audio_data)
#         return jsonify({'transcription': transcription})
#     except Exception as e:
#         return jsonify({'error': str(e)})
    
@app.route('/receive_transcript', methods=['POST'])
def receive_transcript():
    transcript = request.json['transcript']
    print(f"Transcript received: {transcript}")  # You can handle the transcript here as per your requirements
    return 'Transcript received successfully', 200


if __name__ == '__main__':
    app.run(debug=True)
