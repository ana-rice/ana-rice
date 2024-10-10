import base64

from flask import Blueprint, request

blueprint = Blueprint("users", __name__, url_prefix="/api/users")


@blueprint.route("/uploadImage", methods=["POST"])
def upload_image():
    json_data = request.get_json()
    base64_string = json_data["image"]
    image_data = base64.b64decode(base64_string)

    with open("decoded_image.png", "wb") as f:
        f.write(image_data)

    return {"data": "success"}
