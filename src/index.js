import axios from 'axios';


import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.gallery');

let imageType = '';
let images = [];

form.addEventListener('submit', searchImage);
input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

axios.defaults.baseURL = 'https://pixabay.com/api';
function fetchImages(imageType) { 
    console.log(imageType);

    return axios.get((`/?key=29710513-88fdd381238e9ed6d5c0ddb9e&q=${imageType}&image_type=photo&orientation=horizontal&safesearch=true`)).then(response => response.data)
}

function onFormInput(e) { 
    imageType = e.target.value.trim();
}

function searchImage(e) { 
    e.preventDefault();
    if (imageType === '') { 
        Notify.info("Please, fill in the field");
        resetMarkup();
        return;
    };
    fetchImages(imageType).then(image => { return images = image.hits }).then(renderGallery).catch((error) => console.log(error));
}

function renderGallery() { 
     if (images.length === 0) {
        resetMarkup();
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if (images.length >= 1) {
        resetMarkup();
        markupGallery(images);
    } else {
        Notify.info("Приятного просмотра");
    }
}

function markupGallery() { 
    gallery.innerHTML = images.map(image => { 
        return `<div class="photo-card">
                <div class="photo-card__image-container">
                    <img class="photo-card__image" src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" width="500"/>
                </div>
                <div class="info">
                    <p class="info-item">
                    <b class="info-item__name">Likes</b><span class="info-item__data">${image.likes}</span>
                    </p>
                    <p class="info-item">
                    <b class="info-item__name">Views</b><span class="info-item__data">${image.views}</span>
                    </p>
                    <p class="info-item">
                    <b class="info-item__name">Comments</b><span class="info-item__data">${image.comments}</span>
                    </p>
                    <p class="info-item">
                    <b class="info-item__name">Downloads</b><span class="info-item__data">${image.downloads}</span>
                    </p>
                </div>
                </div>`
    }).join('');
}

function resetMarkup() { 
    gallery.innerHTML = '';
}
