import cv2
import dlib
import numpy as np
from imutils import face_utils
from utils import relative_path


# Landmark indexes for Dlib
MOUTH_LEFT_CORNER = 49
MOUTH_RIGHT_CORNER = 55
EYE_LEFT = 39
EYE_RIGHT = 44
# Face detector constants
FACE_DETECTOR_CONFIG = relative_path('../resources/shape_predictor_68_face_landmarks.dat')


detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(FACE_DETECTOR_CONFIG)


def is_face_present(landmarks):
    return landmarks


def get_eyes_center(landmarks, img_size):
    '''
    Get eye point center for assistant to look at, relative to image center point

    note: Defaults to whole image center

    Args:
        landmarks (dict): Dictionary of all found landmarks, (x, y, w, h) format
        img_size (tuple): original image size, (w, h) format

    Returns:
        (x, y) tuple, (None, None) in case no eyes were found
    '''
    img_center_x = img_size[0] / 2
    img_center_y = img_size[1] / 2

    if 'left_eye' in landmarks and 'right_eye' in landmarks:
        lx, ly, l_width, l_height = landmarks['left_eye']
        rx, ry, r_width, r_height = landmarks['right_eye']

        eyes_x_distance = (rx + r_width / 2) - (ly + l_width / 2)
        eyes_y_distance = (ry + r_height / 2) - (ly + l_width / 2)

        eyes_center_x = lx + eyes_x_distance / 2
        eyes_center_y = ly + eyes_y_distance / 2
        # Center relative
        return eyes_center_x - img_center_x, eyes_y - img_center_y
    # Defaults to whole image center (relative to image center -> (0, 0))
    return 0, 0


def get_face_area_size(rect):
    return rect.width() * rect.height()


def get_main_face_rect(rects):
    largest_area = 0
    largest_rect = None
    for rect in rects:
        rect_area = get_face_area_size(rect)
        if rect_area >= largest_area:
            largest_area = rect_area
            largest_rect = rect
    return largest_rect


def detect_landmarks(frame):
    '''
    Recognize faces in frame and obtain their landmarks

    Args:
        frame (numpy): Image frame from webcam (or whatever)

    Returns:
        Landmarks dictionary
    '''
    rects = detector(frame, 0)
    main_face_rect = get_main_face_rect(rects)

    if main_face_rect:
        landmarks = predictor(frame, rect)
        landmarks = face_utils.shape_to_np(landmarks)

        return {
            'mouth_left': landmarks[MOUTH_LEFT_CORNER],
            'mouth_right': landmarks[MOUTH_RIGHT_CORNER],
            'eye_left': landmarks[EYE_LEFT],
            'eye_right': landmarks[EYE_RIGHT]
        }
