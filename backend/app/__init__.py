from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    # Importing routes inside function to avoid circular imports.
    from .routes.users import blueprint as users_blueprint

    app = Flask("app")
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://username:password@database:5432/default_database"
    )

    db.init_app(app)

    app.register_blueprint(users_blueprint)
    return app
