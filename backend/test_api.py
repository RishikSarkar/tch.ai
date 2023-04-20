import requests

url = 'http://localhost:5000/predict-emotion'
files = {'image': open('image.jpg', 'rb')}

response = requests.post(url, files=files)

prediction = response.content.decode('utf-8')
# print(prediction)

url = 'http://localhost:5000/recommend-songs'
data = prediction

response = requests.post(url, data=data)
print(response.json())