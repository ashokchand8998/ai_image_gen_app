/**
 * Server application entry point.
 *
 * This file imports the necessary dependencies and starts the server.
 *
 * @module server/index
 */

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

/**
 * Load environment variables from .env file.
 */
dotenv.config();

/**
 * Create an Express.js application instance.
 */
const app = express();

/**
 * Enable CORS (Cross-Origin Resource Sharing) for all routes.
 */
app.use(cors());

/**
 * Enable JSON parsing for request bodies.
 *
 * @param {string} limit - Maximum allowed request body size in bytes.
 */
app.use(express.json({ limit: '50mb' }));

/**
 * Mount post routes to /api/v1/posts.
 */
app.use('/api/v1/posts', postRoutes);

/**
 * Mount DALL-E routes to /api/v1/dalle.
 */
app.use('/api/v1/dalle', dalleRoutes);

/**
 * Define a route for the root URL (/).
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 */
app.get('/', (req, res) => {
  res.send('Hello from AI Image generation App');
});

/**
 * Start the server and listen for incoming requests.
 *
 * @async
 */
const startServer = async () => {
  try {
    /**
     * Connect to the MongoDB database.
     */
    connectDB(process.env.MONGO_URL);

    /**
     * Start the server and listen for incoming requests on port 8080.
     */
    app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (err) {
    console.log('Error occurred:', err);
  }
};

/**
 * Start the server.
 */
startServer();