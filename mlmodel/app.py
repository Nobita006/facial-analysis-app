from flask import Flask, request, jsonify
from fastai.vision.all import load_learner, PILImage
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def preprocess_image(image):
    img = PILImage.create(image)
    img_resized = img.resize((512, 512))
    img_resized = img_resized.convert("RGB")
    return img_resized

try:
    # Add debug statements to check model loading
    print("Loading the model...")
    learn = load_learner('export.pkl')
    print("Model loaded successfully.")
except Exception as e:
    print("Error loading the model:", e)
    exit()

def run_inference(image):
    try:
        img_tensor = preprocess_image(image)
        _, pred_idx, probs = learn.predict(img_tensor)
        labels = learn.dls.vocab
        predictions = {labels[i]: float(probs[i]) for i in range(len(labels))}
        return predictions
    except Exception as e:
        print("Error during inference:", e)
        raise e  # Reraise the exception to return a detailed error message to the client


@app.route("/upload", methods=["POST"])
def upload():
    if "image" not in request.files:
        return jsonify(error="No image file found"), 400

    image = request.files["image"]

    try:
        predictions = run_inference(image)
        return jsonify(predictions)
    except Exception as e:
        return jsonify(error="Error during inference: {}".format(e)), 500

if __name__ == "__main__":
    app.run()
