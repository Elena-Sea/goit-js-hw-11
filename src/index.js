import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('button.load-more');


form.addEventListener('submit', loadGallOnSubmit);
loadBtn.addEventListener('click', uploadGallery);

const reqOptions = {
    key: '29710513-88fdd381238e9ed6d5c0ddb9e&q',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
}

axios.defaults.baseURL = 'https://pixabay.com/api';
async function fetchImages({ key, q, image_type, orientation, safesearch, per_page, page }) { 
    try {
        const res = await axios.get((`/?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}`));
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

async function loadGallOnSubmit(e) { 
    e.preventDefault();
    reqOptions.q = e.currentTarget.searchQuery.value.trim();
    if (!e.currentTarget.searchQuery.value.length || !reqOptions.q) {
            Notify.warning("Please, fill in the field");
            reqOptions.page = 1;
            resetMarkup();
            return;
        } else if (e.currentTarget.searchQuery.value.length >= 1) { 
        reqOptions.page = 1;
        resetMarkup();
     }
     try { 
        const res = await fetchImages(reqOptions);
        if (reqOptions.page >= 1) { 
            loadBtn.classList.remove('visually-hidden');
        } 
        notificationsInSubmit(res);
        const galleryMarkup = await markupGallery(res.hits);
        return galleryMarkup;
    } catch { 
        error => console.log(error.message);
    }
}

function markupGallery(images) { 
    gallery.insertAdjacentHTML('beforeend', images.map(image => { 
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
    }).join('')
    );
}

async function uploadGallery(e) { 
    reqOptions.page += 1;
    try { 
        const res = await fetchImages(reqOptions);        
        const galleryUpload = await markupGallery(res.hits);
        notificationsInUpload(res);
    } catch { 
        error => console.log(error.message);
    }
}


function resetMarkup() { 
    gallery.innerHTML = '';
}

async function notificationsInSubmit(data) { 
    if (data.totalHits === 0) {
        resetMarkup();
        loadBtn.classList.add('visually-hidden');
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    } else if (data.totalHits > 1) {
        Notify.success(`Hooray we found ${data.totalHits} images`);
    };
}

async function notificationsInUpload(data) {
    const maxNumberPages = Math.ceil(data.totalHits / data.hits.length);
    if (reqOptions.page === maxNumberPages) {
        loadBtn.classList.add('visually-hidden');
        Notify.info("We're sorry, but you've reached the end of search results.")
    }
}
