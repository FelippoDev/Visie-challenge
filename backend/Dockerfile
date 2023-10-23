FROM python:3.11-alpine

WORKDIR /usr/src/api

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add build-base python3-dev libffi-dev freetype-dev
RUN pip3 install --upgrade pip
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .

