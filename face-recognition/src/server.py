import cv2
import numpy as np
import base64
from flask import Flask, request, make_response
from flask_cors import CORS
from PIL import Image
from io import BytesIO
from face_detection import detect_faces
from face_identification import get_face_identity


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
    # Faces detected
    faces = detect_faces(img_np)
    identity = get_face_identity(img_np)

    return {
        "facePresent": identity != None or len(faces) > 0,
        "personId": identity
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
