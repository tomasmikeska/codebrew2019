from os import listdir
from os.path import isfile, isdir, join, exists, dirname


def file_listing(dir):
    '''
    List all files (exclude dirs) in specified directory

    Args:
        dir (string): Director full path
    '''
    return [f for f in listdir(dir) if isfile(join(dir, f))]


def relative_path(path):
    '''Get path relative to file itself instead of dir program was started in'''
    base_dir = dirname(__file__)
    return join(base_dir, path)
