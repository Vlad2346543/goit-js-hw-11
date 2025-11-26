// js/pixabay-api.js
import axios from 'axios';

const API_KEY = '19396225-c483f75d28f30d4068a3a7270'; 
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Виконує HTTP-запит до Pixabay API для отримання зображень за пошуковим запитом.
 * @param {string} query - Пошукове слово.
 * @returns {Promise<Object>} - Проміс, що повертає властивість data з відповіді Axios.
 */
export async function getImagesByQuery(query) {
    // Параметри запиту
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        // Повертаємо властивість data з відповіді (містить hits та total/totalHits)
        return response.data; 
    } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
        // Викидаємо помилку, щоб її обробив caller (main.js)
        throw new Error("Failed to fetch images."); 
    }
}
