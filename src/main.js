// js/main.js
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

// Імпорт стилів для iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const searchInput = form.elements['search-text']; // Доступ до поля вводу за його атрибутом name

/**
 * Відображає повідомлення про помилку за допомогою iziToast.
 * @param {string} message - Текст повідомлення.
 */
function showErrorMessage(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
    });
}

/**
 * Обробник події сабміту форми.
 * @param {Event} event - Об'єкт події.
 */
async function handleSearch(event) {
    event.preventDefault(); // Запобігаємо стандартній відправці форми

    const query = searchInput.value.trim();

    // 1. Перевірка на порожній рядок
    if (query === "") {
        showErrorMessage("Please enter a search query.");
        return;
    }

    // 2. Очищення галереї перед новим пошуком
    clearGallery(); 
    
    // 3. Відображення лоадера
    showLoader(); 

    try {
        // 4. Виконання HTTP-запиту
        const data = await getImagesByQuery(query);
        const images = data.hits;

        // 5. Перевірка на порожній масив
        if (images.length === 0) {
            showErrorMessage("Sorry, there are no images matching your search query. Please try again!");
            clearGallery(); // Гарантуємо, що галерея порожня
        } else {
            // 6. Створення та відображення галереї
            createGallery(images);
        }
    } catch (error) {
        // Обробка помилок запиту
        console.error(error);
        showErrorMessage("An error occurred while fetching images. Please try again later.");
    } finally {
        // 7. Приховування лоадера
        hideLoader();
        // 8. Очищення поля вводу
        form.reset(); 
    }
}

// Додавання слухача події сабміту на форму
form.addEventListener('submit', handleSearch);