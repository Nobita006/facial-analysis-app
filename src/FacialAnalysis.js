import React, { useState } from 'react';
import axios from 'axios';
import './FacialAnalysis.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';

function FacialAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);

    const imageURL = URL.createObjectURL(file);
    setPreviewURL(imageURL);
  };

  const handlePredict = () => {
    if (!selectedFile) {
      console.error('No image selected.');
      return;
    }

    // Set loading to true when the request starts
    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    axios
      .post('https://sayan.work.gd/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const predictions = response.data.predictions;
        const recommendations = response.data.recommendations;

        const sortedPredictions = Object.entries(predictions).sort(
          (a, b) => b[1] - a[1]
        );

        const top3Predictions = sortedPredictions.slice(0, 3);

        const top3PredictionsObj = Object.fromEntries(top3Predictions);

        setPredictions({ predictions: top3PredictionsObj, recommendations });

        // Set loading to false after the response is received
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setPredictions(null);

        // Set loading to false even if there is an error
        setLoading(false);
      });
  };

  return (
    <div className="FacialAnalysis">
      <Card style={{ width: '100%' }} className="analysis-card">
        <Card.Header>
          <h2>Facial Feature Analysis</h2>
        </Card.Header>
        <Card.Body>
          {previewURL && (
            <img src={previewURL} alt="Preview" className="preview-image img-thumbnail" />
          )}

          <div className="upload-form">
            <input type="file" accept="image/*" onChange={handleFileChange} className="form-control-file" />
            <button 
              onClick={handlePredict} 
              className="btn btn-success ml-3" 
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Predicting...' : 'Predict'}  {/* Button text changes based on loading state */}
            </button>
          </div>

          {predictions && (
            <div className="predictions table-responsive">
              <h3>Face Conditions:</h3>
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
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
        </Card.Body>
      </Card>
    </div>
  );
}

export default FacialAnalysis;
