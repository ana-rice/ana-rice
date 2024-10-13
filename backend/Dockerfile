FROM python:3.11-slim AS builder

RUN pip install poetry==1.8.3

WORKDIR /app

COPY pyproject.toml poetry.lock ./

# Install dependencies before copying code so that we don't install dependencies everytime.
RUN poetry install --no-root --without dev

COPY . .

CMD ["poetry", "run", "python", "-u", "-m", "flask", "run", "--host=0.0.0.0", "--debug"]
