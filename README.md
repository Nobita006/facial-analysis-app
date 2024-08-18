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

- npm install (to install react dependencies)
- npm start (to start react app)
- cd .\mlmodel\
- pip install -r requirments.txt (to install app.py dependencies)
- Run app.py

## Frontend:

-Created a React application using Create React App.

-Designed the user interface with a form for image upload and a section to display analysis results.

-Implemented image upload functionality using the <input type="file"> element and FormData.

-Displayed the selected image and analysis results on the frontend.

## Backend:

-<b>recommendation.json:</b> Created a JSON file containing product recommendations for various facial conditions. The JSON structure includes product names, images, and links for each condition.

-<b>app.py (Flask server):</b> I set up a Flask server to handle the image prediction and provide product recommendations. The server loads a pre-trained machine learning model and a JSON file containing product recommendations. When an image is received through the '/predict' endpoint, the server predicts facial conditions, matches them with product recommendations, and sends the results back to the React app.

## Integration:

-Integrated the frontend and backend by making a POST request from the React application to the Flask server server.

-Updated the React components to allow users to upload an image, makes a prediction for facial conditions using a Flask server, and displays the predictions along with product recommendations in a tabular form. display the analysis result and recommended products received from the server.
