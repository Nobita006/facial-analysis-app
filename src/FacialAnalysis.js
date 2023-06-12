import React, { useState } from 'react';
import Result from './Result';

function FacialAnalysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    performAnalysis(file);
  };

  const performAnalysis = (file) => {
    // Here, you can implement the logic to send the image file to the backend for analysis
    // and receive the analysis result and recommended products.
    // For now, let's assume we have a dummy result and recommended products.
    const dummyResult = {
      skinCondition: 'Dry skin',
      recommendedProducts: [
        { id: 1, name: 'Moisturizer' },
        { id: 2, name: 'Hydrating Serum' },
        { id: 3, name: 'Facial Oil' },
      ],
    };
    setAnalysisResult(dummyResult);
  };

  return (
    <div>
      <h1>Facial Analysis App</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px' }} />
      )}
      {analysisResult && (
        <Result
          skinCondition={analysisResult.skinCondition}
          recommendedProducts={analysisResult.recommendedProducts}
        />
      )}
    </div>
  );
}

export default FacialAnalysis;
