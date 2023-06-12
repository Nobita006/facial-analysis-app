const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/beauty_products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Define the route for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  const { filename } = req.file;
  // Perform analysis on the uploaded image and extract features

  // Replace the dummy result with the actual analysis result
  const analysisResult = {
    skinCondition: 'Dry skin',
    recommendedProducts: [
      { name: 'Moisturizer', category: 'Skincare' },
      { name: 'Hydrating Serum', category: 'Skincare' },
      { name: 'Facial Oil', category: 'Skincare' },
    ],
  };

  // Save the analysis result to the database
  const productPromises = analysisResult.recommendedProducts.map(
    (productData) => {
      const product = new Product(productData);
      return product.save();
    }
  );

  Promise.all(productPromises)
    .then(() => {
      console.log('Products saved to the database');
      res.json(analysisResult);
    })
    .catch((error) => {
      console.error('Error saving products to the database:', error);
      res.status(500).json({ error: 'Failed to save products' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
