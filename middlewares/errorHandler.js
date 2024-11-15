const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Generic error fallback
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

module.exports = errorHandler;
