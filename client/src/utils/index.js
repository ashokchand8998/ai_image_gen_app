/**
 * Imports the surpriseMePrompts array from the constants module.
 */
import { surpriseMePrompts } from '../constants';

/**
 * Imports the FileSaver library for saving files to the user's device.
 */
import FileSaver from 'file-saver';

/**
 * Returns a random prompt from the surpriseMePrompts array.
 * If the generated prompt is the same as the input prompt, it recursively calls itself to generate a new prompt.
 *
 * @param {string} prompt - The input prompt to avoid generating.
 * @returns {string} A random prompt from the surpriseMePrompts array.
 */
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt
}

/**
 * Downloads an image to the user's device.
 *
 * @param {string} _id - The ID of the image to download.
 * @param {Blob} photo - The image data to download.
 */
export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}