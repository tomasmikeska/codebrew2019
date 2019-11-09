import numpy as np
import face_recognition
from utils import file_listing


base_path = '../data/ids/'
img_paths = file_listing(base_path)


def get_face_emb(filename):
    img_np = face_recognition.load_image_file(base_path + filename)
    embs = face_recognition.face_encodings(img_np)
    return embs[0] if len(embs) > 0 else None


anchor_embs = list(map(get_face_emb, img_paths))


def get_face_identity(img_np):
    '''
    Get face identity agains anchor embeddings.

    Args:
        img_np (numpy): Input image (w, h, c)

    Returns:
        (string) name of anchor image filename without extension
    '''
    target_embs = face_recognition.face_encodings(img_np)

    if len(target_embs) > 0:
        hits = face_recognition.compare_faces(anchor_embs, target_embs[0])
        hit_idx = hits.index(True) if True in hits else None
        if hit_idx != None:
            return img_paths[hit_idx].split('.')[0]

    return None
