import base64

from flask import Blueprint, request

blueprint = Blueprint("users", __name__, url_prefix="/api/users")


@blueprint.route("/uploadImage", methods=["POST"])
def upload_image():
    data = request.get_json()
    b64_image = data["image"]

    # Get rid of the data URI prefix.
    if "," in b64_image:
        b64_image = b64_image.split(",")[1]

    with open("./images/rice.png", "wb") as f:
        f.write(base64.b64decode(b64_image))

    return {"message": "Image uploaded successfully!"}
