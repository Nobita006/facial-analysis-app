import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastai.vision.all import *
import logging
import json
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure the API key for Google AI
os.environ["GEMINI_API_KEY"] = "AIzaSyA66mTgaASSoa6F9lXj2Zpuxx5QhkS55CM"  
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

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
        return jsonify({'response': bot_response, 'history': history}), 200

    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')