import requests

url = 'http://localhost:5000/predict-emotion'
files = {'image': open('backend/image.jpg', 'rb')}

response = requests.post(url, files=files)
print(response.content.decode('utf-8'))