import React, { useState } from 'react';
import axios from 'axios';
import './FacialAnalysis.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function FacialAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      // The user canceled the file selection, do nothing
      return;
    }
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
        const recommendations = response.data.recommendations;

        // Sort predictions by probability in descending order
        const sortedPredictions = Object.entries(predictions).sort(
          (a, b) => b[1] - a[1]
        );

        // Get the top 3 predictions
        const top3Predictions = sortedPredictions.slice(0, 3);

        // Convert the top 3 predictions to an object
        const top3PredictionsObj = Object.fromEntries(top3Predictions);

        // Update the state with predictions and recommendations
        setPredictions({ predictions: top3PredictionsObj, recommendations });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setPredictions(null);
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
          <h3>Face Conditions:</h3>
          <table>
            <thead>
              <tr>
                <th>Facial Condition</th>
                <th>Probability</th>
                <th>Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(predictions.predictions).map(
                ([condition, probability]) => (
                  <tr key={condition}>
                    <td>{condition}</td>
                    <td>
                      <ProgressBar
                        now={probability * 100}
                        label={`${(probability * 100).toFixed(2)}%`}
                      />
                    </td>
                    <td>
                      {predictions.recommendations[condition].length > 0 ? (
                        <ul className="recommendations-list">
                          {predictions.recommendations[condition].map((product) => (
                            <li key={product.product_name}>
                              <a href={product.product_link} target="_blank" rel="noreferrer">
                                <img
                                  src={product.product_image}
                                  alt={product.product_name}
                                  className="product-image"
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No recommendation</span>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FacialAnalysis;
