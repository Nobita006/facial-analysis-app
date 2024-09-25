# AI Website for Facial Feature Extraction and Skin Analysis with Beauty Product Recommendations

This application provides beauty product recommendations based on facial features and skin analysis using AI/ML. It features a frontend built with React, a Flask backend for image prediction, and a tuned AI model for generative responses to user queries. The app recommends products for skin conditions and provides users the ability to clarify any skincare-related questions.

## Features

- **AI-Driven Facial Feature Extraction**: Uses a machine learning model to analyze facial features and skin conditions.
- **Beauty Product Recommendations**: Recommends beauty products based on facial analysis results.
- **Generative AI Chatbot**: Users can ask clarifying questions about skin conditions or product recommendations, powered by a fine-tuned **"gemini-1.5-flash" generative AI** model.
- **Bootstrap Styling**: Frontend is styled using Bootstrap for a modern, responsive design.
- **Frontend Hosting**: Deployed on GitHub Pages for easy access.
- **Backend Hosting**: Flask backend hosted on AWS Lightsail for handling predictions and chatbot responses.

## Live Website

https://nobita006.github.io/facial-analysis-app/

## Screenshots

1. 
![image](https://github.com/user-attachments/assets/5f4da5d9-6f71-43a4-95fa-e221c498ca9c)

2. 

https://github.com/user-attachments/assets/cb6632b5-f554-4484-bd00-9e7cae9b9450


## Setup

Follow the instructions below to set up the project locally.

1. Clone the repository:

   ```bash
   git clone https://github.com/Nobita006/facial-analysis-app.git
   cd facial-analysis-app/
   ```

2. Install React dependencies:

   ```bash
   npm install
   npm start  # To start the React app
   ```

3. Navigate to the backend directory and set up the Python environment:

   ```bash
   cd mlmodel
   python3 -m venv venv
   source venv/bin/activate  # For Linux or Mac
   .\venv\Scripts\activate  # For Windows
   ```

4. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Start the Flask backend:

   ```bash
   python app.py
   # OR, for production:
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

## Frontend

- **React Application**: Built using Create React App.
- **Bootstrap Styling**: Incorporated Bootstrap to improve styling and responsiveness across devices.
- **Image Upload and Display**: Users can upload images for analysis using an `<input type="file">` element. The uploaded image and analysis results are displayed on the frontend.
- **POST Request to Backend**: A POST request is sent from the frontend to the Flask server for image prediction.
- **Deployed on GitHub Pages**: Deployed using `npm run deploy -- -m "Deploy message"`

## Backend

- **Flask API**: A Flask server handles image prediction and provides product recommendations based on skin analysis.
- **Product Recommendation JSON**: A `recommendation.json` file stores dummy beauty product recommendations for various facial conditions, including product names, images, and links.
- **Generative AI Integration**: Integrated the "gemini-1.5-flash" model to handle user queries related to skin analysis and product recommendations.
  - The model has been fine-tuned to provide expert and concise advice on skincare routines, answer questions in a friendly tone, and ask for additional details when necessary.
- **Deployed on AWS Lightsail**: The Flask server is hosted on AWS Lightsail for reliable backend performance.

## AI Model

### 1. **Setup and Initialization**

- **Environment**: Installed necessary packages, including `fastbook` and `fastai`, to build a machine learning model for skin analysis.
  
- **Library Imports**: Imported modules for image processing, data augmentation, and model training from `fastai.vision`.

### 2. **Data Collection**

- **Skin Problem Categories**: Defined various skin conditions (e.g., acne, dark circles, oily skin) to categorize the images.
- **Image Downloading**: Used DuckDuckGo's image search API to download images related to these skin conditions.

### 3. **Data Preparation**

- **Image Verification**: Verified the downloaded images to ensure there are no corrupted files.
- **DataBlock Setup**: Used `DataBlock` to handle the data pipeline, including loading images, splitting data into training and validation sets, and applying transformations.
- **DataLoaders**: Created `dls` (DataLoaders) to efficiently load the data during model training.

### 4. **Model Training**

- **Data Augmentation**: Applied image transformations (e.g., random resized cropping) to make the model more robust.
- **Model Definition**: Used `cnn_learner` to define a convolutional neural network (CNN) model with a pre-trained ResNet50 architecture. Fine-tuned the model on the skin condition dataset.

### 5. **Model Export**

- **Export Model**: After training, exported the model using `learn.export()`, generating an `export.pkl` file to be used for inference in the Flask server.

## Integration

- **Frontend to Backend**: Integrated the React frontend and Flask backend using a POST request. When a user uploads an image, it is sent to the Flask backend for analysis.
- **Chatbot Integration**: Added a generative AI chatbot that allows users to ask follow-up questions about their skin analysis and get additional product recommendations.
- **Result Display**: The React app dynamically displays the analysis result and recommended products received from the Flask server in a tabular format.

## Future Improvements

- **Real Product Integration**: Replace dummy product recommendations with real beauty products and dynamic pricing.
- **User Authentication**: Implement user accounts to save skin analysis history and personalized recommendations.
- **Multilingual Support**: Add support for multiple languages to cater to a broader user base.

