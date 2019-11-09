# --------------------------------------------------------------------
# Base image: python:3.7-slim (apt-get)
# --------------------------------------------------------------------

FROM python:3.7-slim
ENV LANG C.UTF-8

# --------------------------------------------------------------------
# System libs
# --------------------------------------------------------------------

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential apt-utils ca-certificates wget git

# --------------------------------------------------------------------
# OpenCV
# --------------------------------------------------------------------

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        cmake unzip pkg-config \
        libjpeg-dev libpng-dev libtiff-dev \
        libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
        libxvidcore-dev libx264-dev \
        libatlas-base-dev gfortran \
        libsm6 libxext6 libxrender-dev

# --------------------------------------------------------------------
# Working directory
# --------------------------------------------------------------------

COPY . /app
WORKDIR /app

# --------------------------------------------------------------------
# PyPI
# --------------------------------------------------------------------

RUN pip3 --no-cache-dir install --upgrade -r requirements.txt

# --------------------------------------------------------------------
# Ports
# --------------------------------------------------------------------

# Flask app port
EXPOSE 5000
