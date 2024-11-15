// server.js
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();
