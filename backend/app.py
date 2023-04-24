import os
import cv2
# import h5py
# import boto3
import numpy as np
import pandas as pd
from flask_cors import CORS
# from dotenv import load_dotenv
from keras.models import load_model
from flask import Flask, request, jsonify

# load_dotenv()

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

app = Flask(__name__)
CORS(app)

# AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "")
# AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", "")
# AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME", "")

# s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

# bucket = 'tchai-models'
# key = 'model.h5'

# s3.download_file(bucket, key, 'model/temp-model')
# with h5py.File('model/temp-model','r') as f:
#     model = load_model('model/temp-model')

# os.remove('model/temp-model')

model_path = 'model/model.h5'
model = load_model(model_path)

song_dataset = pd.read_csv(os.path.join('data', 'dataset.csv'))
song_dataset = song_dataset[['track_name', 'artists', 'energy', 'loudness', 'mode', 'valence', 'track_genre', 'popularity']]

# Predict Emotion
@app.route('/predict-emotion', methods=['POST'])
def predict_emotion():
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    if len(img.shape) > 2:
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        img_gray = img

    img_resized = cv2.resize(img_gray, (48, 48))
    img_array = np.array(img_resized)

    img_processed = preprocess_image(img_array)

    img_resized = cv2.resize(img_processed, (48, 48))

    img_array = np.array(img_resized)

    img_final = img_array.reshape(1, 48, 48, 1)

    predict_x = model.predict(img_final, verbose=0)
    result = np.argmax(predict_x, axis=1)
    prediction = mood_from_label(result[0])

    print(prediction)

    return prediction

def preprocess_image(img):
    if len(img.shape) > 2:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        gray = img

    haarscascade_dir = 'haarscascade/haarcascade_frontalface_alt2.xml'
    face_cascade = cv2.CascadeClassifier(haarscascade_dir)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
        faces = img[y:y + h, x:x + w]

    return img

def mood_from_label(label):
    labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
    return labels[label]

# Recommend Songs
@app.route('/recommend-songs', methods=['POST'])
def recommend_songs():
    data = request.get_data(as_text=True)

    songs = song_dataset[song_dataset['popularity'] >= 50]
    songs = songs[songs['track_genre'].isin(find_song_genres(data))]

    if (data == 'angry'):
        songs = songs[(songs['energy'] >= 0.69) & (songs['loudness'] >= -7) & (songs['valence'] <= 0.46)]
    elif (data == 'disgust'):
        songs = song_dataset[song_dataset['track_genre'].isin(find_song_genres('disgust'))]
    elif (data == 'fear'):
        songs = songs[(songs['energy'] <= 0.69) & (songs['loudness'] <= -7) & (songs['valence'] >= 0.46)]
    elif (data == 'happy'):
        songs = songs[(songs['mode'] == 1) & (songs['valence'] >= 0.68)]
    elif (data == 'neutral'):
        songs = songs[songs['popularity'] >= 80]
    elif (data == 'sad'):
        songs = songs[(songs['mode'] == 0) & (songs['valence'] <= 0.26)]
    elif (data == 'surprise'):
        songs = songs[(songs['energy'] >= 0.85) & (songs['valence'] >= 0.46)]

    songs = songs.dropna()
    songs = songs.sample(n=5, replace=False)
    songs = songs.loc[:, ['track_name', 'artists']]

    return songs.to_json(orient='records')

# def find_song_mood(pred):
#     if (pred == 'angry' or pred == 'disgust' or pred == 'fear'):
#         return 'Calm'
#     elif (pred == 'happy' or pred == 'neutral'):
#         return 'Happy'
#     elif (pred == 'sad'):
#         return 'Sad'
#     elif (pred == 'surprise'):
#         return 'Energetic'
    
def find_song_genres(pred):
    if (pred == 'angry'):
        return ['alternative', 'black-metal', 'death-metal', 'dubstep', 'heavy-metal', 'grindcore', 'metal', 'grunge', 'industrial', 'punk']
    elif (pred == 'disgust'):
        return ['children']
    elif (pred == 'fear'):
        return ['ambient', 'chill', 'classical', 'deep-house', 'jazz', 'piano', 'study', 'sleep', 'trance', 'guitar', 'blues']
    elif (pred == 'happy'):
        return ['acoustic', 'ambient', 'anime', 'classical', 'disco', 'disney', 'happy', 'jazz', 'j-pop', 'k-pop', 'reggae', 'guitar', 'gospel']
    elif (pred == 'neutral'):
        return ['acoustic', 'hip-hop', 'jazz', 'pop', 'k-pop', 'rock', 'world-music', 'anime', 'indie', 'guitar', 'country']
    elif (pred == 'sad'):
        return ['acoustic', 'alternative', 'blues', 'goth', 'romance', 'sleep', 'soul', 'classical', 'piano', 'british', 'emo']
    elif (pred == 'surprise'):
        return ['alt-rock', 'anime', 'bluegrass', 'breakbeat', 'detroit-techno', 'disco', 'dubstep', 'edm', 'hip-hop', 'house', 'rock-n-roll']

if __name__ == '__main__':
    app.run(debug=True, port=5000)