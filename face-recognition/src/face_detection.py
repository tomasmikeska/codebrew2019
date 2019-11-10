import cv2
import numpy as np
from utils import relative_path


HAARCASCADE_CONFIG = relative_path('../resources/haarcascade_eye_tree_eyeglasses.xml')

eyes_detector = cv2.CascadeClassifier(HAARCASCADE_CONFIG)


def get_eyes_center(eyes_landmarks, img_size):
    '''
    Get eye point center for assistant to look at, relative to image center point

    note: Defaults to whole image center

    Args:
        eyes_landmarks (array): Array of eyes points in (x, y, w, h) format
        img_size (tuple): original image size, (w, h) format

    Returns:
        (x, y) tuple, (None, None) in case no eyes were found
    '''
    img_center_x = img_size[0] / 2
    img_center_y = img_size[1] / 2

    if len(eyes_landmarks) > 1:
        lx, ly, l_width, l_height = eyes_landmarks[0]
        rx, ry, r_width, r_height = eyes_landmarks[1]

        eyes_x_distance = (rx + r_width / 2) - (ly + l_width / 2)
        eyes_y_distance = (ry + r_height / 2) - (ly + l_width / 2)

        eyes_center_x = lx + eyes_x_distance / 2
        eyes_center_y = ly + eyes_y_distance / 2

        # Center relative
        return eyes_center_x - img_center_x, eyes_center_y - img_center_y

    elif len(eyes_landmarks) > 0:  # Only one eye detected
        x, y, width, height = eyes_landmarks[0]
        return (x + width / 2) - img_center_x, (y + height / 2) - img_center_y

    return None, None


def detect_eyes(frame):
    '''
    Recognize faces in frame and check if there is face looking at screen

    Args:
        frame (numpy): Image frame from webcam (or whatever)

    Returns:
        boolean indicating whether face is present
    '''
    return eyes_detector.detectMultiScale(frame)
