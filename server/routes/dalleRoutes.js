/**
 * DALL-E Routes
 *
 * This file defines the routes for the DALL-E API.
 *
 * @module server/routes/dalleRoutes
 */

import express, { response } from "express";
import * as dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

/**
 * Create an Express.js router instance for DALL-E routes.
 */
const router = express.Router();

/**
 * Initialize the OpenAI client with the API key from the environment variables.
 */
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Define a GET route for the root URL (/) that returns a hello message.
 *
 * @route GET /
 * @returns {string} Hello message
 */
router.route("/").get((req, res) => {
    res.send("Hello from DALL-E!")
})

/**
 * Define a POST route for the root URL (/) that generates an image based on the prompt.
 *
 * @route POST /
 * @param {string} prompt - The prompt to generate an image for
 * @returns {object} Image data in JSON format
 */
router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await client.images.generate({
            model: "dall-e-2",
            prompt,
            n: 1,
            size: process.env.GEN_IMG_RES,
            response_format: 'b64_json'
        });
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error);
        response.status(500).send(error?.response.data.error.message);
    }
})

export default router;