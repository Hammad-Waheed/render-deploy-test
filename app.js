// app.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const employeeRoutes = require('./routes/employeeRoutes')
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/questionnaire', questionnaireRoutes);
app.use('/api/v1/employee', employeeRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
