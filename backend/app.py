from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import os
import cv2

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

app = Flask(__name__)

model_path = 'backend/model/model.h5'
model = load_model(model_path)

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

    predict_x = model.predict(img_final)
    result = np.argmax(predict_x, axis=1)
    prediction = mood_from_label(result[0])

    print(prediction)

    return prediction

def preprocess_image(img):
    if len(img.shape) > 2:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        gray = img

    haarscascade_dir = 'backend/haarscascade/haarcascade_frontalface_alt2.xml'
    face_cascade = cv2.CascadeClassifier(haarscascade_dir)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
        faces = img[y:y + h, x:x + w]

    return img

def mood_from_label(label):
    labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
    return labels[label]



if __name__ == '__main__':
    app.run(debug=True, port=5000)