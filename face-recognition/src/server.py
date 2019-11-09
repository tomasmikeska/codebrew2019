import cv2
import numpy as np
import base64
from flask import Flask, request, make_response
from flask_cors import CORS
from PIL import Image
from io import BytesIO
from face_recognition import detect_eyes, get_eyes_center


app = Flask('Face Recognition')
CORS(app)


def base64_to_np(data_uri):
    '''
    Convert base64 uri string to numpy array

    Args:
        data_uri (string): base64 image string

    Returns:
        numpy array containing image
    '''
    encoded_image = data_uri.split(',')[1]
    decoded_image = base64.b64decode(encoded_image)
    img_pil = Image.open(BytesIO(decoded_image), mode='r')
    return np.asarray(img_pil)


@app.route('/', methods=['POST'])
def is_face_present():
    # Decode image
    data_uri = request.get_json(silent=True)['img']
    img_np = base64_to_np(data_uri)
    # Eyes landmarks
    eyes = detect_eyes(img_np)
    eyes_x, eyes_y = get_eyes_center(eyes, img_np.shape[:2])

    return {
        "facePresent": len(eyes) >= 2,
        "landmarks": {
            "eyesCenter": {
                "x": eyes_x,
                "y": eyes_y
            }
        }
    }
