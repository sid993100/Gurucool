const express = require('express');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware and routes would be set up here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
