FROM python:3.12

WORKDIR /code

COPY ./backend/requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./backend /code

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]