const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userProfileRoutes = require('./routes/UserProfileRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const transferRoutes = require('./routes/transferRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const userInfoRoutes = require('./routes/userInfoRoutes');
const combinedTransactionRoutes = require('./routes/combinedTransactionRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user-profile', userProfileRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/user', userInfoRoutes);
app.use('/api/transactions', combinedTransactionRoutes);
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});