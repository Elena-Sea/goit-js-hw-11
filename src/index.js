
import debounce from 'lodash.debounce';


const refs = {
    form: document.querySelector('form#search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
};

console.log(refs.gallery);
const DEBOUNCE_DELAY = 300;

refs.form.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));


let inputName;

refs.form.addEventListener('submit', onFormSubmit);

function onFormInput() { 

    inputName = refs.input.value;
    console.log(inputName);
    if (inputName === '') { 
        resetMarkup();
        return;
    }
    // fetchImages(imageName).then(renderGallery).catch(error => {
    //     Notify.failure("Oops, there is no image with that name");
    // }); 
}

function onFormSubmit(e) { 
    e.preventDefault();
    if (!refs.input.value) { 
            return alert('Please fill in all fields!');
        }
}

function resetMarkup() { 
    gallery.innerHTML = '';
}
