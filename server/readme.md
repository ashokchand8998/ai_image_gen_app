# Overview

This is the server folder for the DALL-E clone project. It contains the necessary files to set up and run the server, including routes, database connections, and models.

### Folder Structure

- index.js: The main entry point of the server application.
- routes: A folder containing route files for the server.
- dalleRoutes.js: Routes for the DALL-E API.
- postRoutes.js: Routes for handling posts.
- mongodb: A folder containing files for connecting to the MongoDB database.
- connect.js: A file that establishes a connection to the MongoDB database.
- models: A folder containing model files for the application.
- post.js: A model file for posts.

### Server Functionality

The server is built using Express.js and connects to a MongoDB database using Mongoose. It has two main routes:

- /api/v1/dalle: Routes for the DALL-E API, which generates images based on prompts.
- /api/v1/posts: Routes for handling posts.
Environment Variables

The server uses environment variables to store sensitive information, such as the MongoDB connection string and API keys. These variables are loaded from a .env file.


 ### Dependencies

- express: The Express.js framework.
- cors: A middleware for enabling CORS.
- dotenv: A package for loading environment variables from a .env file.
- mongoose: A package for connecting to MongoDB.
- openai: A package for interacting with the OpenAI API.

### Setup

To set up the server, follow these steps:

- Create a .env file in the root of the project(server folder) and add the necessary environment variables.
- Install the dependencies using npm install.
- Start the server from terminal using **npm start**.


### API Documentation

**API documentation is not provided in this README. However, the route files (dalleRoutes.js and postRoutes.js) contain JSDoc comments that describe the API endpoints and their parameters.**