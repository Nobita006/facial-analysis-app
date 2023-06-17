import React, { useState } from 'react';
import axios from 'axios';

const FacialAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const renderImagePreview = () => {
    if (!selectedImage) {
      return null;
    }
  
    return (
      <div className="image-preview">
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Preview"
          style={{ width: '300px', height: '300px' }}
        />
      </div>
    );
  };
  

  return (
    <div>
      <h2>Facial Analysis</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload</button>
      </form>
      {renderImagePreview()}
      {analysisResult && (
        <div className="analysis-result">
          <h2>Analysis Result:</h2>
          <p>Skin Condition: {analysisResult.skinCondition}</p>
          <h3>Recommended Products:</h3>
          <ul>
            {analysisResult.recommendedProducts.map((product) => (
              <li key={product.name}>
                <strong>{product.name}</strong> - {product.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacialAnalysis;
