from flask import Flask

from .endpoints.users import blueprint as users_blueprint


def create_app():
    app = Flask(__name__)
    app.register_blueprint(users_blueprint)
    return app
