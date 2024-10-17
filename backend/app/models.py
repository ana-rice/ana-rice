from .extensions import db


class RiceImage(db.Model):
    __tablename__ = "rice_images"

    pid = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String, nullable=False)
    path = db.Column(db.String, nullable=False)

    def __repr__(self) -> str:
        return f"ID: {self.pid}, Path: {self.path}"
