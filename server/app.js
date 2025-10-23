require('dotenv').config(); // <-- must be at top
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const { initializeDatabaseConnection } = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    // Wait for DB to connect first
    await initializeDatabaseConnection();

    // Mount routes after DB is ready
    app.use('/books', bookRoutes);

    app.get('/', (req, res) => {
      res.send('Book Inventory API is running...');
    });

    // 404 handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // Error handler
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
      });
    });

    const port = process.env.PORT || 5000;
    const env = process.env.NODE_ENV;
    app.listen(port, () => {
      console.log(`Server running on port ${port} [${env}] environment`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
})();

module.exports = app;
