import React, { useState } from 'react';
import axios from 'axios';

const FacialAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleAnalysis = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const response = await axios.post('http://localhost:3000/upload', formData);
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error performing analysis:', error);
    }
  };

  return (
    <div>
      <h2>Facial Analysis</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" width="300" />}
      <button onClick={handleAnalysis} disabled={!selectedImage}>
        Analyze
      </button>
      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <p>Skin Condition: {analysisResult.skinCondition}</p>
          <h4>Recommended Products:</h4>
          <ul>
            {analysisResult.recommendedProducts.map((product) => (
              <li key={product.name}>
                {product.name} - {product.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacialAnalysis;
