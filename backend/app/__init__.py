from flask import Flask
from flask_migrate import Migrate

from .config import Config
from .extensions import db
from .routes.images import blueprint as users_blueprint


def create_app():
    # Importing routes inside function to avoid circular imports.

    app = Flask("app")
    app.config.from_object(Config)

    db.init_app(app)
    _migrate = Migrate(app, db)

    app.register_blueprint(users_blueprint)

    return app
