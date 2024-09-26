import React, { useState } from 'react';
import axios from 'axios';
import './FacialAnalysis.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import Resizer from 'react-image-file-resizer';

function FacialAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  // Resize the image while maintaining the aspect ratio
  const resizeImage = (file, maxDimension) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxDimension, // Max width or height (whichever is larger)
        maxDimension, // Max height or width (aspect ratio is maintained)
        'JPEG',       // Output format
        70,           // Quality percentage
        0,            // Rotation angle
        (uri) => {
          resolve(uri);  // Return the resized image as a Blob
        },
        'blob'  // Return format: blob (can also be base64)
      );
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    // Wait for the image to load to get its dimensions
    image.onload = async () => {
      const { width, height } = image;

      let resizedFile = file;

      // Resize if the image dimensions exceed 1000px
      if (width > 1000 || height > 1000) {
        resizedFile = await resizeImage(file, 1000);
      }

      setSelectedFile(resizedFile);
      const imageURL = URL.createObjectURL(resizedFile);
      setPreviewURL(imageURL);
    };
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

        const top3Predictions = sortedPredictions.slice(0, 5);

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

  // Add a new ref for the selfie input
  const selfieInputRef = React.createRef();

  // Function to trigger the hidden selfie input
  const handleSelfieClick = () => {
    selfieInputRef.current.click(); // Simulate a click on the hidden input
  };

  // Add another handle function for the selfie input change
  const handleSelfieFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = async () => {
      const { width, height } = image;

      let resizedFile = file;

      // Resize if the image dimensions exceed 1000px
      if (width > 1000 || height > 1000) {
        resizedFile = await resizeImage(file, 1000);
      }

      setSelectedFile(resizedFile);
      const imageURL = URL.createObjectURL(resizedFile);
      setPreviewURL(imageURL);
    };
  };

  return (
    <div className="FacialAnalysis d-flex justify-content-center align-items-center">
      <Card style={{ width: '100%' }} className="analysis-card p-4">
        <Card.Header className="text-center">
          <h2>Facial Feature Analysis</h2>
        </Card.Header>
        <Card.Body className="text-center">
          {previewURL && (
            <img src={previewURL} alt="Preview" className="preview-image img-thumbnail mb-4" />
          )}

          <div className="mb-3">
            {/* Bootstrap custom file input */}
            <div className="input-group mb-3">
              <div className="custom-file">
                <input 
                  type="file" 
                  className="custom-file-input" 
                  id="inputGroupFile01" 
                  accept="image/*" // Allows choosing from gallery or taking a picture
                  onChange={handleFileChange}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Select Face Picture
                </label>
              </div>
            </div>
          </div>

          {/* Add Click Selfie button for mobile devices */}
          <div className="mb-3 d-md-none">
            {/* Hidden file input for selfies with capture="user" */}
            <input 
              ref={selfieInputRef} 
              type="file" 
              accept="image/*" 
              capture="user" // Opens camera for selfie 
              className="d-none"  // Hidden input
              onChange={handleSelfieFileChange} 
            />
            
            {/* Button that triggers the hidden input */}
            <button 
              className="btn btn-primary btn-block" 
              onClick={handleSelfieClick} 
            >
              Click Selfie
            </button>
          </div>

          <div>
            <button 
              onClick={handlePredict} 
              className="btn btn-success btn-block"
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </div>
          
          {predictions && (
            <div className="predictions table-responsive mt-4">
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
