const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

// Create the Express application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beauty_products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for the product data
const productSchema = new mongoose.Schema({
  product_image: String,
  product_link: String,
  class: String,
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Define the route for image uploads and analysis
app.post('/upload', upload.single('image'), async (req, res) => {
  // Image analysis logic (Replace this with your actual ML analysis)
  // ...

  // Example analysis result
  const analysisResult = {
    skinCondition: 'Dry skin',
    recommendedProducts: [
      { name: 'Moisturizer', category: 'Skincare' },
      { name: 'Hydrating Serum', category: 'Skincare' },
      { name: 'Facial Oil', category: 'Skincare' },
    ],
  };

  // Fetch top 3 product recommendations from MongoDB
  const top3Products = await Product.find({ class: analysisResult.skinCondition })
    .limit(3)
    .exec();

  // Extract product image URLs and links
  const productImages = top3Products.map((product) => product.product_image);
  const productLinks = top3Products.map((product) => product.product_link);

  // Prepare the final response
  const finalResponse = {
    skinCondition: analysisResult.skinCondition,
    recommendedProducts: analysisResult.recommendedProducts,
    productImages,
    productLinks,
  };

  res.json(finalResponse);
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://0.0.0.0:3000');
});