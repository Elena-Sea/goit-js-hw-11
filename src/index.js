import axios from 'axios';


import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');


let imageType = '';
let images = [];
let page = 1;

form.addEventListener('submit', showImages);
input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
loadBtn.addEventListener('click', onLoadMore);


axios.defaults.baseURL = 'https://pixabay.com/api';
function fetchImages(imageType) { 
    console.log(imageType);

    return axios.get((`/?key=29710513-88fdd381238e9ed6d5c0ddb9e&q=${imageType}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)).then(response => response.data)
}

function onFormInput(e) { 
    imageType = e.target.value.trim();
    if (imageType === '') { 
        resetMarkup();
        Notify.info("Please, type to search...");
    };
}

function onSubmit(e) { 
      e.preventDefault();
    if (imageType === '') { 
        Notify.info("Please, fill in the field");
        resetMarkup();
        return;
    };
    page += 1;
}

async function showImages(e) { 
    onSubmit(e);
    try {
        const res = await fetchImages(imageType);
        console.log(res);
        // const numberFoundImages = res.totalHits;
        // const { hits, totalHits } = response.data;
        // console.log(response.data);
        const numberFoundImages = res.totalHits;
        console.log(numberFoundImages);
        const images = res.hits;
        console.log(images);
        const checkup = await canRenderGallery(res);

    //    if (images === 0) {
    //     resetMarkup();
    //     Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    // } else if (numberFoundImages >= 1) {
    //     Notiflix.Notify.success(`Hooray we found ${numberFoundImages} images`);
    // } else {
    //     resetMarkup();
    // }
       
        // Load = await markupGallery();
    }
    catch { 
        error => console.log(error.message);
    }
}

function canRenderGallery(res, page) { 
    const maxNumberPages = Math.ceil(res.totalHits / res.hits.length);

    console.log(maxNumberPages);

    if (res.totalHits === 0) {
        console.log(res.totalHits);
        resetMarkup();
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    } else if (res.totalHits > 1) {
        console.log(res.totalHits);
        Notify.success(`Hooray we found ${res.totalHits} images`);
        page += 1;
    } else {
        resetMarkup();
    }
}

function markupGallery() { 
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

function resetMarkup() { 
    gallery.innerHTML = '';
}


function onLoadMore() { 
    // return page += 1;
    console.log('load more');
    fetchImages(imageType).then(image => { return images = images.hits }).then(page += 1).then(markupGallery()).catch((error) => console.log(error));
}

// function appendGalleryMarkup(images) { 
//     gallery.insertAdjacentHTML('beforeend', markupGallery(images));
// }

function resetMarkup() { 
    gallery.innerHTML = '';
}

// startTimerBtn.disabled = true;