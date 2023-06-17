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

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Define the route for image uploads and analysis
app.post('/upload', upload.single('image'), (req, res) => {
  // Image upload and analysis logic
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

  res.json(analysisResult);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
