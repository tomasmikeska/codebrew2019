import cv2
import numpy as np
from utils import relative_path


HAARCASCADE_CONFIG = relative_path('../resources/haarcascade_frontalface_default.xml')

face_detector = cv2.CascadeClassifier(HAARCASCADE_CONFIG)


def detect_faces(frame):
    '''
    Recognize faces in frame and check if there is face looking at screen

    Args:
        frame (numpy): Image frame from webcam (or whatever)

    Returns:
        boolean indicating whether face is present
    '''
    return face_detector.detectMultiScale(frame)
