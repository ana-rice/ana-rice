# Ana Rice

## Run Application

```bash
docker compose up --watch --build
```

## Setup Backend

- [Install `pipx`](https://pipx.pypa.io/latest/installation/).
- Install `poetry`:

```bash
pipx install poetry
```

- Initialize Python shell.

```bash
cd backend
poetry shell
```

- Add dependencies:

```bash
poetry add [dependency]
```

## Database

### PgAdmin

Navigate to `localhost:15433` and login with username: `user@domain.com` and password: `password`.

### Update Schema

Run the application:

```bash
docker compose up --watch --build
```

`exec` into the backend container:

```bash
docker compose exec backend bash
```

Start Poetry shell:

```bash
poetry shell
```

Run `Flask-Migrate` commands:

```bash
flask db migrate -m "Message"
flask db upgrade
```
