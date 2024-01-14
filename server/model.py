# import numpy as np
# import pandas as pd
# import tensorflow as tf
# # from tensorflow.keras import layers, models
# # from tensorflow.keras.preprocessing.image import img_to_array, load_img
# # from sklearn.model_selection import train_test_split
# # from sklearn.preprocessing import LabelEncoder
# # from sklearn.metrics import classification_report, confusion_matrix
# # import cv2


# # Assuming you have FER2013.csv downloaded and stored locally
# df = pd.read_csv('path/to/FER2013.csv')

# # Extract pixels and labels from the dataset
# pixels = df['pixels'].tolist()
# labels = df['emotion'].astype('str').tolist()

# # Convert pixels to numpy arrays and reshape for image dimensions
# images = np.array([np.fromstring(pixel, dtype=int, sep=' ').reshape(48, 48, 1) for pixel in pixels])
# labels = np.array(labels)

# # Normalize pixel values to the range [0, 1]
# images = images / 255.0

# # Convert emotion labels to one-hot encoded format
# label_encoder = LabelEncoder()
# labels = tf.keras.utils.to_categorical(label_encoder.fit_transform(labels), num_classes=7)


# # Assuming you have FER2013.csv downloaded and stored locally
# df = pd.read_csv('./FER2013.csv')

# # Extract pixels and labels from the dataset
# pixels = df['pixels'].tolist()
# labels = df['emotion'].astype('str').tolist()

# # Convert pixels to numpy arrays and reshape for image dimensions
# images = np.array([np.fromstring(pixel, dtype=int, sep=' ').reshape(48, 48, 1) for pixel in pixels])
# labels = np.array(labels)

# # Normalize pixel values to the range [0, 1]
# images = images / 255.0

# # Convert emotion labels to one-hot encoded format
# label_encoder = LabelEncoder()
# labels = tf.keras.utils.to_categorical(label_encoder.fit_transform(labels), num_classes=7)
