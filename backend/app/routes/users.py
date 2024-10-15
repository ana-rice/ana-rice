from flask import Blueprint, request
from werkzeug.utils import secure_filename

from ..models import RiceImage, db

blueprint = Blueprint("users", __name__, url_prefix="/api/users")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def is_file_allowed(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@blueprint.route("/uploadImage", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return {"message": "No file found."}, 400

    file = request.files["file"]

    if not file.filename:
        return {"message": "No selected file."}, 400
    elif file and is_file_allowed(file.filename):
        filename = secure_filename(file.filename)
        path = f"./images/{filename}"
        file.save(path)

        # Add to database.
        try:
            rice_image = RiceImage(filename=filename, path=path)
            db.session.add(rice_image)
            db.session.commit()
        except Exception as e:
            return {"message": f"Failed to add to database: {e}"}, 500

        return {"message": "File successfully uploaded!"}

    return {"message": "Something went wrong."}, 500
