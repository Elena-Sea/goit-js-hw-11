import axios from 'axios';


import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input');
const form = document.querySelector('form#search-form');
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', searchImage);

let imageType = '';
input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) { 
    imageType = e.target.value.trim();
}

axios.defaults.baseURL = 'https://pixabay.com/api';

function fetchImages(imageType) { 
    console.log(imageType);

    return axios.get((`/?key=29710513-88fdd381238e9ed6d5c0ddb9e&q=${imageType}&image_type=photo&orientation=horizontal&safesearch=true`)).then(response => response.data)
}

function searchImage(e) { 
    e.preventDefault();

    // if (imageType === '') { 
    //     resetMarkup();
    //     return;
    // };
    fetchImages(imageType).then(image => console.log(image)).catch((error) => console.log(error));
}
























// const refs = {
//     form: document.querySelector('form#search-form'),
//     input: document.querySelector('input'),
//     gallery: document.querySelector('.gallery'),
// };

// console.log(refs.gallery);
// const DEBOUNCE_DELAY = 300;

// refs.form.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));


// // let inputName;

// refs.form.addEventListener('submit', onFormSubmit);

// function onFormInput(e) { 

//     const inputName = e.target.value.trim();
//     console.log(inputName);
//     // if (inputName === '') { 
//     //     resetMarkup();
//     //     return;
//     // }
//     fetchImages(inputName).catch(error => {
//         console.log(error.message);
//     }); 
// }

// function onFormSubmit(e) { 
//     e.preventDefault();
//     if (!refs.input.value) { 
//             return alert('Please fill in all fields!');
//         }
// }

// function resetMarkup() { 
//     gallery.innerHTML = '';
// }
