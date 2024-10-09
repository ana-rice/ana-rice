import base64

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"


@app.post("/api/saveImage")
def saveImage():
    # Example JSON containing a Base64-encoded image
    json_data = request.get_json()

    # Get the Base64 string from the JSON
    base64_string = json_data["image"]

    # Decode the Base64 string
    image_data = base64.b64decode(base64_string)

    # Write the image data to a file (e.g., a PNG file)
    with open("decoded_image.png", "wb") as f:
        f.write(image_data)
