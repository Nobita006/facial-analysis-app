from flask import Flask, request, jsonify
from flask_cors import CORS
from fastai.vision.all import *
import pandas as pd
import logging
import json

app = Flask(__name__)
CORS(app)

def load_model():
    learn = load_learner('export.pkl')
    return learn

def load_recommendations():
    with open('recommendation.json') as f:
        recommendations = json.load(f)
    return recommendations

def get_labels(learner):
    return learner.dls.vocab

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow requests from any domain
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

def predict_image(img_path, learner):
    img = PILImage.create(img_path)
    pred, pred_idx, probs = learner.predict(img)
    labels = get_labels(learner)
    predictions = {labels[i]: float(probs[i]) for i in range(len(labels))}
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Load the model and recommendations
        learner = load_model()
        recommendations = load_recommendations()

        # Get the image from the POST request
        image_file = request.files['image']
        img_path = 'temp.jpg'  # Save the image temporarily
        image_file.save(img_path)

        # Perform the prediction using the loaded model
        predictions = predict_image(img_path, learner)

        # Remove the temporarily saved image
        os.remove(img_path)

        # Get the corresponding recommendations for each prediction
        recommended_products = {condition: recommendations.get(condition, []) for condition in predictions}

        # Return the prediction as a JSON response with recommendations
        response = jsonify({'predictions': predictions, 'recommendations': recommended_products})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers['Content-Type'] = 'application/json'
        return response
    except Exception as e:
        logging.error(str(e))
        response = jsonify({'error': str(e)})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers['Content-Type'] = 'application/json'
        return response

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
