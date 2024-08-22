/**
 * Post routes module.
 *
 * This module defines routes for creating and retrieving posts.
 *
 * @module postRoutes
 */

import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

/**
 * Create an Express.js router instance for post routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Cloudinary configuration.
 *
 * Set up Cloudinary API credentials and config.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_NAME_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_NAME_SECRET,
});

/**
 * Get all posts route.
 *
 * Retrieve a list of all posts from the database.
 *
 * @route GET /
 * @returns {Promise<Post[]>} A promise resolving to an array of post documents.
 */
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

/**
 * Create a post route.
 *
 * Create a new post document in the database.
 *
 * @route POST /
 * @param {string} name - The name of the post.
 * @param {string} prompt - The prompt for the post.
 * @param {string} photo - The photo for the post.
 * @returns {Promise<Post>} A promise resolving to the newly created post document.
 */
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Upload an image
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500, { success: false, message: error })
  }
})

export default router;