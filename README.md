# Al model for facial feature extraction and skin analysis. It also recommends beauty products based on analysis. (Full stack + Al-ML)

![image](https://github.com/Nobita006/facial-analysis-app/assets/110232335/71d2a820-5e03-48e2-bcee-e9b95e51821e)

![image](https://github.com/Nobita006/facial-analysis-app/assets/110232335/9fbc26ab-e451-4893-ae4b-0315311850d6)


## Frontend:

-Created a React application using Create React App.

-Designed the user interface with a form for image upload and a section to display analysis results.

-Implemented image upload functionality using the <input type="file"> element and FormData.

-Displayed the selected image and analysis results on the frontend.

## Backend:

<b>recommendation.json:</b> Created a JSON file containing product recommendations for various facial conditions. The JSON structure includes product names, images, and links for each condition.

<b>app.py (Flask server):</b> We set up a Flask server to handle the image prediction and provide product recommendations. The server loads a pre-trained machine learning model and a JSON file containing product recommendations. When an image is received through the '/predict' endpoint, the server predicts facial conditions, matches them with product recommendations, and sends the results back to the React app.

## Integration:

-Integrated the frontend and backend by making a POST request from the React application to the Flask server server.

-Updated the React components to allow users to upload an image, makes a prediction for facial conditions using a Flask server, and displays the predictions along with product recommendations in a tabular form. display the analysis result and recommended products received from the server.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
