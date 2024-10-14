from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .endpoints.users import blueprint as users_blueprint

db = SQLAlchemy()


def create_app():
    app = Flask("app")
    app.register_blueprint(users_blueprint)
    return app
