FROM python:3.11-slim AS builder

RUN pip install poetry==1.8.3

WORKDIR /app

COPY . .

RUN poetry install

CMD ["poetry", "run", "python", "-m", "flask", "run"]
