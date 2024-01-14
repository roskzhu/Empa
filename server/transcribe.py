#!/usr/bin/env python
# coding: utf-8

# In[1]:


# get_ipython().system('pip3 install speechrecognition')
# get_ipython().system('pip3 install pyaudio')
# get_ipython().system('pip3 install pyttsx3')
# get_ipython().system('pip3 install pocketsphinx')


# In[2]:


import speech_recognition as sr
import pyttsx3 


# In[3]:


# r = sr.Recognizer() 
recognizer = sr.Recognizer()

def SpeakText(command, rate):
    engine = pyttsx3.init()

    # setting how fast it picks up audio
    engine.setProperty('rate', rate)

    engine.say(command) 
    engine.runAndWait()


# In[ ]:

def transcribe_audio(audio_data):
    try:
        with sr.AudioFile(audio_data) as source:
            recognizer.energy_threshold = 15000
            recognizer.adjust_for_ambient_noise(source, duration=0.1)
            audio = recognizer.listen(source)

            transcription = recognizer.recognize_sphinx(audio)
            transcription = transcription.lower()

            SpeakText(transcription, rate=2000)

            return transcription
    except sr.UnknownValueError:
        return 'Could not understand audio'
    except sr.RequestError as e:
        return f'Recognition request failed; {str(e)}'

# while True:
#     try:
#         with sr.Microphone() as source2:
#             r.energy_threshold = 15000
#             r.adjust_for_ambient_noise(source2, duration=0.1)
#             audio2 = r.listen(source2)  # Set a shorter timeout

#             MyText = r.recognize_sphinx(audio2)
#             MyText = MyText.lower()

#             print("Did you say:", MyText)
#             SpeakText(MyText, rate=2000)  # Increase the speech rate if needed

#     except sr.RequestError as e:
#         print("Could not request results; {0}".format(e))
#     except sr.WaitTimeoutError as e:
#         print("Listening timed out while waiting for phrase to start")
#     except sr.UnknownValueError:
#         continue
