const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const port = process.env.PORT || 3000;


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

app.use('/api/auth', authRoutes); // Mount authRoutes at /api/auth
app.use('/api/product', productRoutes); // Mount authRoutes at /api/product
app.use('/api/order', orderRoutes); // Mount order routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on the PORT : http://localhost:${port}`);
});
