import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastai.vision.all import *
import logging
import json
import google.generativeai as genai
import boto3
from io import BytesIO

app = Flask(__name__)
CORS(app)

# Configure the API key for Google AI
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Set up the model configuration
generation_config = {
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 212,
    "response_mime_type": "text/plain",
}

# Create a GenerativeModel instance
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="Provide expert and short advice on skincare routines, recommend products based on different skin types and conditions, and answer questions with a friendly and professional tone. Keep the replies very brief and precise. Also, you can ask for details to get a better understanding of the problem.",
)

# Set up AWS S3 for model and recommendation storage
s3 = boto3.client('s3')
BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'facial-analysis-bucket')

# Load the model from S3
def load_model():
    model_file = BytesIO()
    s3.download_fileobj(BUCKET_NAME, 'export.pkl', model_file)
    model_file.seek(0)
    learn = load_learner(model_file)
    return learn

# Load the recommendations from S3
def load_recommendations():
    obj = s3.get_object(Bucket=BUCKET_NAME, Key='recommendation.json')
    recommendations = json.loads(obj['Body'].read().decode('utf-8'))
    return recommendations

# Get labels from the learner
def get_labels(learner):
    return learner.dls.vocab

# Upload image to S3
def upload_image_to_s3(image_file):
    img = image_file.read()
    s3.upload_fileobj(BytesIO(img), BUCKET_NAME, 'temp.jpg')

# Download image from S3
def download_image_from_s3():
    with BytesIO() as data:
        s3.download_fileobj(BUCKET_NAME, 'temp.jpg', data)
        data.seek(0)
        img = PILImage.create(data)
    return img

# Add CORS headers
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow requests from any domain
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Predict on the uploaded image
def predict_image(img, learner):
    pred, pred_idx, probs = learner.predict(img)
    labels = get_labels(learner)
    predictions = {labels[i]: float(probs[i]) for i in range(len(labels))}
    return predictions

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Load the model and recommendations from S3
        learner = load_model()
        recommendations = load_recommendations()

        # Upload image to S3
        image_file = request.files['image']
        upload_image_to_s3(image_file)

        # Download the image from S3 for prediction
        img = download_image_from_s3()

        # Perform prediction using the model
        predictions = predict_image(img, learner)

        # Get the corresponding recommendations for each prediction
        recommended_products = {condition: recommendations.get(condition, []) for condition in predictions}

        # Return the prediction as a JSON response with recommendations
        response = jsonify({'predictions': predictions, 'recommendations': recommended_products})
        response = add_cors_headers(response)
        return response
    except Exception as e:
        logging.error(str(e))
        response = jsonify({'error': str(e)})
        response = add_cors_headers(response)
        return response

# Chatbot response route
@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        # Get the user's message and conversation history from the request
        user_input = request.json.get('message')
        history = request.json.get('history', [])

        # Ensure history is a list before processing
        if not isinstance(history, list):
            history = []

        # Convert the history format to the required structure for the SDK
        formatted_history = [
            {"role": item["role"], "parts": [item["content"]]} for item in history if "role" in item and "content" in item
        ]

        # Start a new chat session with the model, including the formatted history
        chat_session = model.start_chat(history=formatted_history)

        # Send the user's message to the model
        response = chat_session.send_message(user_input)

        # Get the response text from the model
        bot_response = response.text

        # Append the user message and bot response to the history
        history.append({"role": "user", "content": user_input})
        history.append({"role": "model", "content": bot_response})

        # Return the response and updated history to the frontend
        response_data = jsonify({'response': bot_response, 'history': history})
        response_data = add_cors_headers(response_data)
        return response_data, 200

    except Exception as e:
        logging.error(str(e))
        response = jsonify({'error': str(e)})
        response = add_cors_headers(response)
        return response, 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')