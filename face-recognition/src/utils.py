from os.path import join, dirname


def relative_path(path):
    '''Get path relative to file itself instead of dir program was started in'''
    base_dir = dirname(__file__)
    return join(base_dir, path)
