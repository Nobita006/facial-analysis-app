# Al model for facial feature extraction and skin analysis. It also recommends dummy beauty products based on analysis. (Full stack + Al-ML)

I made an app that recommends dummy beauty products based on facial features and skin analysis. (Full stack + Al-ML).
It uses an Al model for facial feature extraction and skin analysis.
Frontend is done in react.
A Flask server is set up at the backend to handle image prediction and provide product recommendations.

## Screenshots

1. 
![image](https://github.com/user-attachments/assets/88abaa94-59f4-48ed-8ecb-8e3f210fd5f9)


2. 
![image](https://github.com/user-attachments/assets/57ad6ae0-3b98-494a-99ab-5c0f2ff7b590)

## Setup:

- git clone https://github.com/Nobita006/facial-analysis-app.git
- cd facial-analysis-app/
- npm install (to install react dependencies)
- npm start (to start react app)
- cd mlmodel
- python3 -m venv venv
- source venv/bin/activate (for linux)    or   .\venv\Scripts\activate (for Windows)
- pip install -r requirments.txt (to install app.py dependencies)
- python app.py   or   gunicorn -w 4 -b 0.0.0.0:5000 app:app

## Frontend:

-Created a React application using Create React App.

-Designed the user interface with a form for image upload and a section to display analysis results.

-Implemented image upload functionality using the <input type="file"> element and FormData.

-Displayed the selected image and analysis results on the frontend.

## Backend:

-<b>recommendation.json:</b> Created a JSON file containing product recommendations for various facial conditions. The JSON structure includes product names, images, and links for each condition.

-<b>app.py (Flask server):</b> I set up a Flask server to handle the image prediction and provide product recommendations. The server loads a pre-trained machine learning model and a JSON file containing product recommendations. When an image is received through the '/predict' endpoint, the server predicts facial conditions, matches them with product recommendations, and sends the results back to the React app.

## AI model:

#### **1. Setup and Initialization**
- **Environment Setup:**
  - The notebook begins by installing and importing the necessary packages, particularly `fastbook` and `fastai`, which are essential for building and training machine learning models in computer vision tasks.
  
- **Library Imports:**
  - The notebook imports various modules from the `fastai.vision` package, which are used for image processing, data augmentation, and model training.

#### **2. Data Collection**
- **Skin Problem Categories:**
  - A list of skin conditions is defined, which includes common issues like dark circles, oily skin, acne, etc. These categories will be used to gather images and label them accordingly.
  
- **Image Downloading:**
  - Images related to the defined skin conditions are searched and downloaded using DuckDuckGo’s image search API. These images are stored in a structured directory, categorized by skin condition.

#### **3. Data Preparation**
- **Image Verification:**
  - After downloading, the images are verified to ensure they are not corrupted. Any invalid images are removed to maintain a clean dataset.
  
- **DataBlock Definition:**
  - A `DataBlock` is defined to handle the data pipeline. It includes configurations for loading images, splitting the dataset into training and validation sets, labeling images based on their directory names, and applying image transformations like resizing.

- **Data Loaders:**
  - The `DataBlock` is instantiated to create data loaders (`dls`). These data loaders are responsible for efficiently loading the data during the training process.

#### **4. Model Training**
- **Data Augmentation:**
  - Further data augmentations are applied, including random resized cropping and other image transformations, to make the model more robust to variations in the input data.
  
- **Model Definition and Training:**
  - A convolutional neural network (CNN) model is defined using the `cnn_learner` function with a pre-trained ResNet50 architecture. The model is fine-tuned on the dataset for several epochs to learn the features corresponding to different skin conditions.

#### **5. Model Export**
- **Model Export:**
  - After training, the model is exported using the `learn.export()` function. This creates an `export.pkl` file containing the trained model, which can be used for inference on new data without needing to retrain.


## Integration:

- Integrated the frontend and backend by making a POST request from the React application to the Flask server server.

- Updated the React components to allow users to upload an image, makes a prediction for facial conditions using a Flask server, and displays the predictions along with product recommendations in a tabular form. display the analysis result and recommended products received from the server.
