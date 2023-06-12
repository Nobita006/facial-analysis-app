import React from 'react';

function Result({ skinCondition, recommendedProducts }) {
  return (
    <div>
      <h2>Analysis Result</h2>
      <p>Skin Condition: {skinCondition}</p>
      <h3>Recommended Products:</h3>
      <ul>
        {recommendedProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
