// js/render-functions.js
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('#loader');

// Створення екземпляра SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt', // Використовувати alt як підпис
    captionDelay: 250,
});

/**
 * Створює HTML-розмітку для картки зображення.
 * @param {Object} image - Об'єкт зображення з Pixabay API.
 * @returns {string} - Рядок HTML-розмітки.
 */
function createImageCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
        <li class="gallery-item">
            <a href="${largeImageURL}" class="gallery-link" alt="${tags}">
                <img src="${webformatURL}" alt="${tags}" class="gallery-image">
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b> ${likes}</p>
                <p class="info-item"><b>Views</b> ${views}</p>
                <p class="info-item"><b>Comments</b> ${comments}</p>
                <p class="info-item"><b>Downloads</b> ${downloads}</p>
            </div>
        </li>
    `;
}

/**
 * Створює HTML-розмітку для галереї, додає її в контейнер та оновлює SimpleLightbox.
 * @param {Array<Object>} images - Масив об'єктів зображень.
 */
export function createGallery(images) {
    if (!galleryElement) return;

    const markup = images.map(createImageCardMarkup).join('');
    galleryElement.insertAdjacentHTML('beforeend', markup);

    // Оновлення SimpleLightbox після додавання нових елементів
    lightbox.refresh(); 
}

/**
 * Очищує вміст контейнера галереї.
 */
export function clearGallery() {
    if (galleryElement) {
        galleryElement.innerHTML = '';
    }
}

/**
 * Додає клас для відображення лоадера.
 */
export function showLoader() {
    if (loaderElement) {
        // Припустимо, що клас 'is-visible' робить лоадер видимим
        loaderElement.classList.add('is-visible'); 
    }
}

/**
 * Прибирає клас для приховування лоадера.
 */
export function hideLoader() {
    if (loaderElement) {
        loaderElement.classList.remove('is-visible');
    }
}