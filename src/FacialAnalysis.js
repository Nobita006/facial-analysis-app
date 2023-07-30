import React, { useState } from 'react';
import axios from 'axios';
import './FacialAnalysis.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function FacialAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a temporary URL for image preview
    const imageURL = URL.createObjectURL(file);
    setPreviewURL(imageURL);
  };

  const handlePredict = () => {
    if (!selectedFile) {
      console.error('No image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const predictions = response.data.predictions;
        setPredictions(predictions);
        fetchRecommendations(predictions);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setPredictions(null);
        setRecommendations([]);
      });
  };

  const fetchRecommendations = (predictions) => {
    // Replace "YOUR_MONGODB_CONNECTION_STRING" with your actual MongoDB connection string
    const mongoConnectionString = 'mongodb://localhost:27017/';

    // Replace "YOUR_DATABASE_NAME" and "YOUR_COLLECTION_NAME" with your actual database name and collection name
    const databaseName = 'beauty_products';
    const collectionName = 'products';

    axios
      .post(mongoConnectionString, {
        databaseName,
        collectionName,
        predictions,
      })
      .then((response) => {
        setRecommendations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
        setRecommendations([]);
      });
  };

  return (
    <div className="FacialAnalysis">
      <h2>Facial Feature Analysis</h2>
      {/* Show the image preview */}
      {previewURL && <img src={previewURL} alt="Preview" className="preview-image" />}

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handlePredict}>Predict</button>

      {predictions && (
        <div className="predictions">
          <h3>Face Condition Predictions:</h3>
          {Object.entries(predictions).map(([condition, probability]) => (
            <div key={condition}>
              <div>{condition}</div>
              <ProgressBar now={probability * 100} label={`${(probability * 100).toFixed(2)}%`} />
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Recommended Solutions:</h3>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>
                <img src={recommendation.product_image} alt="Product" />
                <a href={recommendation.product_link} target="_blank" rel="noopener noreferrer">
                  {recommendation.class}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FacialAnalysis;
